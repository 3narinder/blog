import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFq6OJEioMh9VJGOBH96N4Yx3iwckitJ4",
  authDomain: "my-mern-blog-1993.firebaseapp.com",
  projectId: "my-mern-blog-1993",
  storageBucket: "my-mern-blog-1993.firebasestorage.app",
  messagingSenderId: "899793204512",
  appId: "1:899793204512:web:9adcce974de3a7a4dc5345",
  measurementId: "G-WWNXFZ42XF",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });
  return user;
};
