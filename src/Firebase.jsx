
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTzNAO7UKKKfJ8_g_3ysD0COta7ulC0Kw",
  authDomain: "task-manager-9a252.firebaseapp.com",
  projectId: "task-manager-9a252",
  storageBucket: "task-manager-9a252.appspot.com",
  messagingSenderId: "604647518466",
  appId: "1:604647518466:web:a87b9e123b60d471b1121b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
