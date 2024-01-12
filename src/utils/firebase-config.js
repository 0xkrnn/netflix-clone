// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA76y6-NuBcUeaYiBogOcJMGscp-2hA17w",
  authDomain: "react-netflix-clone-a8fdf.firebaseapp.com",
  projectId: "react-netflix-clone-a8fdf",
  storageBucket: "react-netflix-clone-a8fdf.appspot.com",
  messagingSenderId: "143694030435",
  appId: "1:143694030435:web:dac10db552648c4e763a56",
  measurementId: "G-W4ZN2YB9BD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)