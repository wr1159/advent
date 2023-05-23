import app from '../firebaseconfig';
import {
  UserCredential,
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth';

const auth = getAuth(app);

export default async function signIn(
  email: string,
  password: string
): Promise<{ result: UserCredential | null; error: Error | null }> {
  let result: UserCredential | null = null;
  let error: Error | null = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e: unknown) {
  //  console.log(e);
    error = e as Error;
  }
  return { result, error };
}
