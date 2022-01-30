import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const signupUser = async (email, password) => {
  return (await createUserWithEmailAndPassword(auth, email, password)).user.uid;
};

const loginUser = async (email, password) => {
  return (await signInWithEmailAndPassword(auth, email, password)).user.uid;
};

const logoutUser = () => {
  return signOut(auth);
};

const subscribeToAuthChanges = (handleStateChange) => {
  onAuthStateChanged(auth, handleStateChange);
};

const FirebaseAuthService = {
  signupUser,
  loginUser,
  logoutUser,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
