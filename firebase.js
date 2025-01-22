// src/lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAovBXrgkEKGtQwouzsIiVhXyjMT72l8qM",
  authDomain: "pbwkelompok5.firebaseapp.com",
  projectId: "pbwkelompok5",
  storageBucket: "pbwkelompok5.firebasestorage.app",
  messagingSenderId: "371933318310",
  appId: "1:371933318310:web:ba2ab41aebcf4fefc8f867",
  measurementId: "G-V2LQZ3STXC"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };