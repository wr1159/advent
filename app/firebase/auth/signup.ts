import app from '../../../firebaseconfig';

import { createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const auth = getAuth(app);

// export default async function signUp(email, password) {
export default async function signUp(
  email: string,
  password: string
): Promise<{ result: any; error: any }> {
  let result = null;
  let error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}
