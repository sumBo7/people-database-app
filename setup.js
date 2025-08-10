#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Setting up People Database App...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
const clientEnvPath = path.join(__dirname, 'client', '.env');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  
  // Generate a secure JWT secret
  const jwtSecret = crypto.randomBytes(64).toString('hex');
  
  const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# JWT Secret (generated automatically)
JWT_SECRET=${jwtSecret}

# Database Configuration
DATABASE_URL=./database/people.db

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
} else {
  console.log('✅ .env file already exists');
}

if (!fs.existsSync(clientEnvPath)) {
  console.log('📝 Creating client .env file...');
  
  const clientEnvContent = `REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_API_URL=http://localhost:5000
`;

  fs.writeFileSync(clientEnvPath, clientEnvContent);
  console.log('✅ Client .env file created successfully!');
} else {
  console.log('✅ Client .env file already exists');
}

// Create database directory if it doesn't exist
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✅ Database directory created');
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Get your Google OAuth credentials from Google Cloud Console');
console.log('2. Update the .env files with your Google Client ID and Secret');
console.log('3. Run "npm run install-all" to install dependencies');
console.log('4. Run "npm run dev" to start the application');
console.log('\n📖 For detailed instructions, see README.md');
