import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Import other Firebase services if needed

const firebaseConfig = {
  apiKey: "AIzaSyD_ucy4a2kU2JTztQ-Rzecvzdy3kE9svXc",
  authDomain: "comhub-62c9c.firebaseapp.com",
  projectId: "comhub-62c9c",
  storageBucket: "comhub-62c9c.appspot.com",
  messagingSenderId: "49015158089",
  appId: "1:49015158089:web:e835294b0721967db8d698",
  measurementId: "G-L6X8DFQ2JD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = getFirestore(app); 
const storage = getStorage(app);

export {auth,fs,storage}  // Export both auth and firestore for use in other files
