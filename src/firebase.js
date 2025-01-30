// // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app"
import "firebase/compat/database";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyAJLfZ6u1AUL3Ne0J-qJRLRAeQxCH0Bvnk",
//   authDomain: "food-studio-a10b7.firebaseapp.com",
//   projectId: "food-studio-a10b7",
//   storageBucket: "food-studio-a10b7.appspot.com",
//   messagingSenderId: "182884177059",
//   appId: "1:182884177059:web:5bc7d7e2960f578d54db16",
//   measurementId: "G-R2YQXX0RR4"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // const app = initializeApp(firebaseConfig);
// const database = firebase.database();
// const auth = getAuth();

// export {firebase, auth, database};



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDupjslShn6wzzBcVOkIQeVZ5NeKR2pDbI",
  authDomain: "food-studio-85c5f.firebaseapp.com",
  projectId: "food-studio-85c5f",
  storageBucket: "food-studio-85c5f.firebasestorage.app",
  messagingSenderId: "663677432351",
  appId: "1:663677432351:web:2b028f86fdeb241bae1b2a",
  measurementId: "G-R2YQXX0RR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const database = firebase.database();
export const auth = getAuth();
// export const googleAuthProvider = GoogleAuthProvider();

export default app;
// export {firebase, auth, database};