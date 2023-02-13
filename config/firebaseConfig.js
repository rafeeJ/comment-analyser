// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-J84Qa1xdRj8qBbEzTDR1tzGeL5QETBA",
    authDomain: "comment-analyser-1.firebaseapp.com",
    projectId: "comment-analyser-youtube1",
    storageBucket: "comment-analyser-youtube1.appspot.com",
    messagingSenderId: "867676332931",
    appId: "1:867676332931:web:2504cdb981a5a1e0f38cb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);