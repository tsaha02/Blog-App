import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database"; // Import the Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyBR-NMUMEroMwj01zE40lTtgXPX2gC4Xi4",
  authDomain: "blog-site-74cb6.firebaseapp.com",
  databaseURL: "https://blog-site-74cb6-default-rtdb.firebaseio.com/", // Add the Realtime Database URL
  projectId: "blog-site-74cb6",
  storageBucket: "blog-site-74cb6.appspot.com",
  messagingSenderId: "60189733017",
  appId: "1:60189733017:web:ff0da7c625c6e24c710808",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database(); // Use the Realtime Database object

export default firebase;
