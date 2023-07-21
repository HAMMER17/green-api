
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByUOWAZyI79j_iuoXd-ptZINIjG7TATZQ",
  authDomain: "api-chat-78331.firebaseapp.com",
  projectId: "api-chat-78331",
  storageBucket: "api-chat-78331.appspot.com",
  messagingSenderId: "200344286458",
  appId: "1:200344286458:web:825ce6e49501653a310543"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);