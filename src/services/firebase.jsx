// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzO3CjLKoGLmY9jt5EdiAM5QqrPyY5TJs",
  authDomain: "uff1-asqp6a.firebaseapp.com",
  projectId: "uff1-asqp6a",
  storageBucket: "uff1-asqp6a.appspot.com",
  messagingSenderId: "788675984880",
  appId: "1:788675984880:web:521c7ef70db9d369d83135"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);