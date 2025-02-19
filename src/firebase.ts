// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoq7vXV6BYYZLZSapByX9foQeBtfLjSsk",
  authDomain: "nutriscan-71493.firebaseapp.com",
  projectId: "nutriscan-71493",
  storageBucket: "nutriscan-71493.firebasestorage.app",
  messagingSenderId: "411793924981",
  appId: "1:411793924981:web:eac3cfabe78136423de93c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);