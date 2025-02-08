import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc ,
  query,
  where
} from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || "default-api-key",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || "default-auth-domain",
  projectId: process.env.REACT_APP_PROJECT_ID || "default-project-id",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "default-storage-bucket",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "default-sender-id",
  appId: process.env.REACT_APP_APP_ID || "default-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Exporting authentication & Firestore functions
export {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  db,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where
};
