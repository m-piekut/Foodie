import firebase from "firebase";

const firebaseApp = firebase.initializeApp(
  {
    apiKey: "AIzaSyAK2vuEi_fmyf0qGTVhn5K0vY7J6xWr0-o",
    authDomain: "foodie-ccee4.firebaseapp.com",
    databaseURL: "https://foodie-ccee4-default-rtdb.firebaseio.com",
    projectId: "foodie-ccee4",
    storageBucket: "foodie-ccee4.appspot.com",
    messagingSenderId: "287004675749",
    appId: "1:287004675749:web:736e7ded380b68da27c74c",
    measurementId: "G-3EQLXB8ZK4"
  }
);
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()



export {db, auth, storage}

// export default db;