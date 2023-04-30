// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdTlcFz-9B74JMBEpu3pudfwCFt90qNyo",
    authDomain: "card-recommend.firebaseapp.com",
    projectId: "card-recommend",
    storageBucket: "card-recommend.appspot.com",
    messagingSenderId: "292277234185",
    appId: "1:292277234185:web:c793ca359d08afccf926d8",
    measurementId: "G-JZ7FGF00F1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
