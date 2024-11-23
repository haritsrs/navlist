import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAovBXrgkEKGtQwouzsIiVhXyjMT72l8qM",
  authDomain: "pbwkelompok5.firebaseapp.com",
  projectId: "pbwkelompok5",
  storageBucket: "pbwkelompok5.firebasestorage.app",
  messagingSenderId: "371933318310",
  appId: "1:371933318310:web:ba2ab41aebcf4fefc8f867",
  measurementId: "G-V2LQZ3STXC"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);