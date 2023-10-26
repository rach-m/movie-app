import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBElnw-clXXwntk-8fzxVOSihF47zWZ-_s",
  authDomain: "movie-app-76a3d.firebaseapp.com",
  projectId: "movie-app-76a3d",
  storageBucket: "movie-app-76a3d.appspot.com",
  messagingSenderId: "1057187379114",
  appId: "1:1057187379114:web:a9976997db35858e8e1dd3",
  measurementId: "G-9LRVF42F3G",
  databaseURL: "https://movie-app-76a3d-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, signInWithGoogle, logout, db };
