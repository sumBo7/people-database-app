const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, '..', 'database', 'people.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Users table for Google Auth
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    google_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    picture TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // People table for the database
  db.run(`CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    date_of_birth TEXT,
    occupation TEXT,
    notes TEXT,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users (id)
  )`);
});

// Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Google Auth endpoint
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Google token required' });
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists in database
    db.get('SELECT * FROM users WHERE google_id = ?', [googleId], (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (user) {
        // User exists, generate JWT
        const jwtToken = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        res.json({ token: jwtToken, user });
      } else {
        // Create new user
        db.run(
          'INSERT INTO users (google_id, email, name, picture) VALUES (?, ?, ?, ?)',
          [googleId, email, name, picture],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to create user' });
            }

            const newUser = {
              id: this.lastID,
              google_id: googleId,
              email,
              name,
              picture
            };

            const jwtToken = jwt.sign(
              { id: newUser.id, email: newUser.email, name: newUser.name },
              process.env.JWT_SECRET,
              { expiresIn: '7d' }
            );

            res.json({ token: jwtToken, user: newUser });
          }
        );
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  db.get('SELECT id, email, name, picture FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

// People API endpoints
app.get('/api/people', authenticateToken, (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  
  let query = 'SELECT * FROM people WHERE created_by = ?';
  let params = [req.user.id];
  
  if (search) {
    query += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }
  
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);
  
  db.all(query, params, (err, people) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM people WHERE created_by = ?';
    let countParams = [req.user.id];
    
    if (search) {
      countQuery += ' AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm);
    }
    
    db.get(countQuery, countParams, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({
        people,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: result.total,
          pages: Math.ceil(result.total / limit)
        }
      });
    });
  });
});

app.post('/api/people', authenticateToken, (req, res) => {
  const { first_name, last_name, email, phone, address, date_of_birth, occupation, notes } = req.body;
  
  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'First name and last name are required' });
  }
  
  db.run(
    `INSERT INTO people (first_name, last_name, email, phone, address, date_of_birth, occupation, notes, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, email, phone, address, date_of_birth, occupation, notes, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create person' });
      }
      
      db.get('SELECT * FROM people WHERE id = ?', [this.lastID], (err, person) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json(person);
      });
    }
  );
});

app.get('/api/people/:id', authenticateToken, (req, res) => {
  db.get(
    'SELECT * FROM people WHERE id = ? AND created_by = ?',
    [req.params.id, req.user.id],
    (err, person) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person);
    }
  );
});

app.put('/api/people/:id', authenticateToken, (req, res) => {
  const { first_name, last_name, email, phone, address, date_of_birth, occupation, notes } = req.body;
  
  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'First name and last name are required' });
  }
  
  db.run(
    `UPDATE people SET 
     first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, 
     date_of_birth = ?, occupation = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND created_by = ?`,
    [first_name, last_name, email, phone, address, date_of_birth, occupation, notes, req.params.id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update person' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Person not found' });
      }
      
      db.get('SELECT * FROM people WHERE id = ?', [req.params.id], (err, person) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        res.json(person);
      });
    }
  );
});

app.delete('/api/people/:id', authenticateToken, (req, res) => {
  db.run(
    'DELETE FROM people WHERE id = ? AND created_by = ?',
    [req.params.id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete person' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json({ message: 'Person deleted successfully' });
    }
  );
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
