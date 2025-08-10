# People Database App

A modern, full-stack web application for managing people records with Google Authentication. Built with React, Node.js, Express, and SQLite.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google accounts
- 👥 **People Management** - Add, edit, delete, and view people records
- 🔍 **Search & Filter** - Search people by name or email
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful interface built with Tailwind CSS
- 📊 **Pagination** - Efficient data loading with pagination
- 🔒 **Secure** - JWT tokens, rate limiting, and input validation
- 🌐 **Internet Ready** - Deployable to any cloud platform

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **SQLite** - Database (easily migratable to PostgreSQL/MySQL)
- **Google Auth Library** - OAuth 2.0 authentication
- **JWT** - Token-based authentication
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Google Cloud Console account (for OAuth)

### 1. Clone and Install

```bash
git clone <repository-url>
cd people-database-app
npm run install-all
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized origins:
   - `http://localhost:3000` (development)
   - `http://localhost:5000` (development)
   - Your production domain
7. Add authorized redirect URIs:
   - `http://localhost:3000` (development)
   - Your production domain
8. Copy the Client ID and Client Secret

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# JWT Secret (generate a secure random string)
JWT_SECRET=your_jwt_secret_here

# Database Configuration
DATABASE_URL=./database/people.db

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

Create a `.env` file in the `client` directory:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run the Application

```bash
# Development (runs both frontend and backend)
npm run dev

# Or run separately:
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

Visit `http://localhost:3000` to use the application!

## Project Structure

```
people-database-app/
├── server/                 # Backend code
│   └── index.js           # Express server
├── client/                # Frontend code
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   └── index.tsx      # App entry point
│   └── package.json
├── database/              # SQLite database
├── package.json           # Root package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user

### People Management
- `GET /api/people` - List people (with search & pagination)
- `POST /api/people` - Create new person
- `GET /api/people/:id` - Get person details
- `PUT /api/people/:id` - Update person
- `DELETE /api/people/:id` - Delete person

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  google_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  picture TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### People Table
```sql
CREATE TABLE people (
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
);
```

## Deployment

### Option 1: Railway (Recommended)
1. Push code to GitHub
2. Connect repository to Railway
3. Set environment variables in Railway dashboard
4. Deploy automatically

### Option 2: Heroku
1. Create Heroku app
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy with Git

### Option 3: Vercel + Railway
1. Deploy frontend to Vercel
2. Deploy backend to Railway
3. Update environment variables

### Environment Variables for Production
```env
NODE_ENV=production
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=https://yourdomain.com
```

## Security Features

- ✅ JWT token authentication
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Helmet security headers
- ✅ CORS protection
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

## Roadmap

- [ ] Export to CSV/PDF
- [ ] Bulk import functionality
- [ ] Advanced search filters
- [ ] User roles and permissions
- [ ] API documentation
- [ ] Unit and integration tests
- [ ] Dark mode theme
- [ ] Mobile app (React Native)

---

Built with ❤️ using modern web technologies 
