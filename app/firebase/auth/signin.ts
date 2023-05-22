import app from '../../../firebaseconfig';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app);

export default async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.log(e);
        error = e;
    }
    if (result != null) {
      console.log(result.user);  
    }
    return { result, error };
}