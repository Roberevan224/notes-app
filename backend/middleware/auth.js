const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    let serviceAccount;
    
    // Try environment variable first
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } else {
      // Fallback to local file (development only)
      serviceAccount = require('../firebase-service-account-key.json');
    }
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    
    console.log('✅ Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error.message);
    process.exit(1);
  }
}

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      console.warn('⚠️ No token provided');
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid;
    req.userEmail = decodedToken.email;
    console.log(`✅ User authenticated: ${req.userEmail}`);
    next();
  } catch (error) {
    console.error('❌ Auth error:', error.message);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
