import app from '../firebaseconfig';

import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth
} from 'firebase/auth';

const auth = getAuth(app);

// export default async function signUp(email, password) {
export default async function signUp(
  email: string,
  password: string
): Promise<{ result: UserCredential | null; error: Error | null }> {
  let result: UserCredential | null = null;
  let error: Error | null = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e: unknown) {
    //  console.log(e);
    error = e as Error;
  }

  return { result, error };
}
