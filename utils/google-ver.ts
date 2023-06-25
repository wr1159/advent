import app from '../firebaseconfig';
import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthCredential,
  getAuth,
  User
} from 'firebase/auth';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export default function handleGoogleSignIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives a Google Access Token, use it to access the Google API.
      const credential: OAuthCredential | null =
        GoogleAuthProvider.credentialFromResult(result);
      if (credential != null) {
        const token = credential.accessToken;
      }
      // The signed-in user info.
      const user: User | null = result.user;
      // IdP data available using getAdditionalUserInfo(result)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential: OAuthCredential | null =
        GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
