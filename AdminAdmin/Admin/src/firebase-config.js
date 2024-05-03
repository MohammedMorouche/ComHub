
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/Firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyD_ucy4a2kU2JTztQ-Rzecvzdy3kE9svXc",
  authDomain: "comhub-62c9c.firebaseapp.com",
  projectId: "comhub-62c9c",
  storageBucket: "comhub-62c9c.appspot.com",
  messagingSenderId: "49015158089",
  appId: "1:49015158089:web:e835294b0721967db8d698",
  measurementId: "G-L6X8DFQ2JD"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);