// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW6qZQY1zUsjzWKXxxX072zHz2f3mmaZA",
  authDomain: "attedance-systems2.firebaseapp.com",
  projectId: "attedance-systems2",
  storageBucket: "attedance-systems2.appspot.com",
  messagingSenderId: "459819591613",
  appId: "1:459819591613:web:9b2a0600beb7534bd5d4d4",
  measurementId: "G-PMCSY1MW1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
export { db, auth };
