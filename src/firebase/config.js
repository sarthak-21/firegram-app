import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

require ('firebase/compat/auth');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoYMlbrhj3EeRhdYeJ5xRejIH0boiTCIU",
  authDomain: "firegram-photo-gallery-app.firebaseapp.com",
  projectId: "firegram-photo-gallery-app",
  storageBucket: "firegram-photo-gallery-app.appspot.com",
  messagingSenderId: "600756004499",
  appId: "1:600756004499:web:4b8995114f59b355084f66"
};
// const app = firebase.initializeApp(firebaseConfig);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export { projectStorage,
    projectFirestore,
    timestamp,
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    logout
  };
