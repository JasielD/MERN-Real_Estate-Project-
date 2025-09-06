// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-84013.firebaseapp.com",
  projectId: "mern-estate-84013",
  storageBucket: "mern-estate-84013.firebasestorage.app",
  messagingSenderId: "310544506567",
  appId: "1:310544506567:web:90591215c90c4619e568e2",
  measurementId: "G-SQ9QCJW15J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);