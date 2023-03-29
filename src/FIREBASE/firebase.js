import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvxrdMSMCvbMPSl7siYA1-MCe7oQhOyag",
  authDomain: "chatapp-ldamian.firebaseapp.com",
  projectId: "chatapp-ldamian",
  storageBucket: "chatapp-ldamian.appspot.com",
  messagingSenderId: "468783208980",
  appId: "1:468783208980:web:a8657f4a8e9592cc112501"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
export const googleprovider=new GoogleAuthProvider();
export const faceprovider = new FacebookAuthProvider();
