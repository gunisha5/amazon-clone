// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAm-hAnrS-5zl9WnK7_C7xFbN565UnM-l0",
  authDomain: "challenge-8388d.firebaseapp.com",
  projectId: "challenge-8388d",
  storageBucket: "challenge-8388d.appspot.com",
  messagingSenderId: "844134449138",
  appId: "1:844134449138:web:dba58e0002c1e56a16b56b",
  measurementId: "G-9HGPRJ6J78"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();


export { db, auth };
