import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "snapchat-43e31.firebaseapp.com",
  projectId: "snapchat-43e31",
  storageBucket: "snapchat-43e31.appspot.com",
  messagingSenderId: "1086251035138",
  appId: "1:1086251035138:web:3434170baa01ad0966d51b",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
