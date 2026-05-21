// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv78Hw1qIV5hNvRo7CHfZa4GRPQvWxFoE",
  authDomain: "journeyalbum.firebaseapp.com",
  projectId: "journeyalbum",
  storageBucket: "journeyalbum.firebasestorage.app",
  messagingSenderId: "540945199499",
  appId: "1:540945199499:web:a09e1ce66cad3231c3bf8e",
  measurementId: "G-RMWD8P1FDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;