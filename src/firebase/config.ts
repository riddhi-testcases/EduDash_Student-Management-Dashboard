import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDi58eePOUu6JczYRIbtzsMrUF24TwPPgg",
  authDomain: "student-management-dashb-bce68.firebaseapp.com",
  projectId: "student-management-dashb-bce68",
  storageBucket: "student-management-dashb-bce68.firebasestorage.app",
  messagingSenderId: "81311165816",
  appId: "1:81311165816:web:f83c35ee397a1c664cac8d",
  measurementId: "G-REW5L0JCKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
auth.useDeviceLanguage(); // Set language to device default

// Initialize Firestore
export const db = getFirestore(app);

export default app;