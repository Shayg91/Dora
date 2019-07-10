import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbWbpZi-Va0JXEK0j3sqNSjtXAfccKDIs",
  authDomain: "solejr-comp-app.firebaseapp.com",
  databaseURL: "https://solejr-comp-app.firebaseio.com",
  projectId: "solejr-comp-app",
  storageBucket: "solejr-comp-app.appspot.com",
  messagingSenderId: "348793288479",
  appId: "1:348793288479:web:36617b912814f782"
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // *** Storage API ***
  imagesRef = () => {
    return this.storage.ref("images");
  };

  // *** Database API ***
  scenarios = () => {
    let scenarios = [];
    return this.db
      .collection("Scenarios")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          scenarios = [...scenarios, { key: doc.id, value: doc.data() }];
        });
        return scenarios;
      });
  };

  lessons = () => {
    let lessons = [];
    return this.db
      .collection("sole_jr_comp_app_lessons")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          lessons = [...lessons, { key: doc.id, value: doc.data() }];
        });
        return lessons;
      });
  };

  removeLesson = lessonId => {
    return this.db
      .collection("sole_jr_comp_app_lessons")
      .doc(lessonId)
      .delete();
  };

  removeScenario = scenarioId => {};
}

export default Firebase;