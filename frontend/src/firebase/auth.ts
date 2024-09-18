import { auth } from "./firebase";  // Import your Firebase auth instance
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
} from "firebase/auth";  // Correct Firebase function imports

// Register user with email and password
export const doCreateUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user with email and password
export const doSignInWithEmailAndPassword = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign in user with Google
export const doSignInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);  // Use signInWithPopup with the Google provider
};

// Sign out the user
export const doSignOut = (): Promise<void> => {
  return signOut(auth);  // Use Firebase's signOut function
};

// Reset the user's password
export const doPasswordReset = (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

// Change the user's password
export const doPasswordChange = (password: string): Promise<void> => {
  if (auth.currentUser) {
    return updatePassword(auth.currentUser, password);
  } else {
    return Promise.reject(new Error("No user is signed in."));
  }
};

// Send an email verification to the user
export const doSendEmailVerification = (): Promise<void> => {
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`,
    });
  } else {
    return Promise.reject(new Error("No user is signed in."));
  }
};

