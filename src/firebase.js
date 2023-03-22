// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from  "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8XoaoO2Oy-vGLfoJuELDGBGxToygDeNo",
  authDomain: "attendance-system-595c9.firebaseapp.com",
  projectId: "attendance-system-595c9",
  storageBucket: "attendance-system-595c9.appspot.com",
  messagingSenderId: "615030830711",
  appId: "1:615030830711:web:921f65b09da82abaad3872",
  measurementId: "G-2MMHEM01YL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const analytics = getAnalytics(app);
export default db;
