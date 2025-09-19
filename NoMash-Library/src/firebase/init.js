// src/firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCt04NHigNBO0MWEqgvrvZNAtY5kL_qyt4",
  authDomain: "week7---monish.firebaseapp.com",
  projectId: "week7---monish",
  storageBucket: "week7---monish.firebasestorage.app",
  messagingSenderId: "817574975645",
  appId: "1:817574975645:web:feab9525cac8d9cd4c5c74",
  measurementId: "G-5GW7H8FXNW"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
