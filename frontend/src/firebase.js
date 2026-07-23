import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC_UXSNSOq4k7FPAvUCq80VoYzikZz3ghs",
  authDomain: "notes-app-67cd0.firebaseapp.com",
  projectId: "notes-app-67cd0",
  storageBucket: "notes-app-67cd0.firebasestorage.app",
  messagingSenderId: "977304912859",
  appId: "1:977304912859:web:d359bcc6eabefb817c1dfe",
  measurementId: "G-2X0MJZTQD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
