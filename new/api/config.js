// api/config.js
// This replaces your netlify/functions/api.js

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Test endpoint
  if (req.url === '/api/test') {
    return res.status(200).json({
      message: 'Function is working!',
      timestamp: new Date().toISOString(),
      environment: 'Vercel'
    });
  }

  // 🔒 IMPORTANT: You should NOT expose this endpoint in production!
  // This is just for testing. Remove it after confirming your function works.
  if (req.url === '/api/config') {
    return res.status(200).json({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID
    });
  }

  // Default 404
  return res.status(404).json({ error: 'Endpoint not found' });
}