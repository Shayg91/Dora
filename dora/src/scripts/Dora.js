import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-l0qbD3ZOzHfI_rs-PjvD2I7_k3Z4xy0",
  authDomain: "dora-d8968.firebaseapp.com",
  databaseURL: "https://dora-d8968.firebaseio.com",
  projectId: "dora-d8968",
  storageBucket: "dora-d8968.appspot.com",
  messagingSenderId: "319894956120"
};
firebase.initializeApp(config);

export default firebase;
