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

const firebaseConfig = {
  apiKey: "AIzaSyDbWbpZi-Va0JXEK0j3sqNSjtXAfccKDIs",
  authDomain: "solejr-comp-app.firebaseapp.com",
  databaseURL: "https://solejr-comp-app.firebaseio.com",
  projectId: "solejr-comp-app",
  storageBucket: "solejr-comp-app.appspot.com",
  messagingSenderId: "348793288479",
  appId: "1:348793288479:web:36617b912814f782"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
