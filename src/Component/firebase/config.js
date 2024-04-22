import firebase from 'firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyBFlt79MoRKNJKzucP_1fZmPpoKdUvyL1c",
    authDomain: "fir-25b1f.firebaseapp.com",
    projectId: "fir-25b1f",
    storageBucket: "fir-25b1f.appspot.com",
    messagingSenderId: "1053470455004",
    appId: "1:1053470455004:web:2dd936a52e89a0d5343019",
    measurementId: "G-HW5GEYQ4E5"
  };


export  const Firebase = firebase.initializeApp(firebaseConfig)
