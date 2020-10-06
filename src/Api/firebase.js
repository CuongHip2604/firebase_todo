import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA8up_q3SEB_-CM9qMBKj183w0ylkcmjrU",
  authDomain: "to-do-app-a2cfa.firebaseapp.com",
  databaseURL: "https://to-do-app-a2cfa.firebaseio.com",
  projectId: "to-do-app-a2cfa",
  storageBucket: "to-do-app-a2cfa.appspot.com",
  messagingSenderId: "730411490828",
  appId: "1:730411490828:web:5b0834b5518f62bc129829",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
