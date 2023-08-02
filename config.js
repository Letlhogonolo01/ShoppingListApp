import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu2G_6wF1RuCU1ZhypY8RKNp-ZnE-L8Fo",
  authDomain: "shoppinglist-490e7.firebaseapp.com",
  projectId: "shoppinglist-490e7",
  storageBucket: "shoppinglist-490e7.appspot.com",
  messagingSenderId: "392185380770",
  appId: "1:392185380770:web:251e86311d185c4983fcfb",
  measurementId: "G-L035LQRVBR",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
