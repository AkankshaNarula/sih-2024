// firebase.ts or firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXeGFdxe5IA-zsDn2FZXt5I6f7E0ylpvk",
  authDomain: "sih-dj.firebaseapp.com",
  projectId: "sih-dj",
  storageBucket: "sih-dj.appspot.com",
  messagingSenderId: "132777228053",
  appId: "1:132777228053:web:aaaf1b59e92b7eff625b1c",
  measurementId: "G-6JX7GE0B9V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export the auth object

