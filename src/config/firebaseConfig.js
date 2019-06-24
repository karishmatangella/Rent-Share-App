import firebase from "firebase/app";
require("firebase/firestore");
require("firebase/auth");

let firebaseConfig = {
  apiKey: "AIzaSyAXZqvYYNIF94TcUX5tir7TH0rWS0c781g",
  authDomain: "school-project-server.firebaseapp.com",
  databaseURL: "https://school-project-server.firebaseio.com",
  projectId: "school-project-server",
  storageBucket: "school-project-server.appspot.com",
  messagingSenderId: "303976332687"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
