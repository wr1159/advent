'use client';
import Button from '@/components/Button';
import handleGoogleSignIn from '@/utils/google-ver';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app, { firestore, users } from '@/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { useRef } from 'react';

function Page() {
  const router = useRouter();
  const auth = getAuth(app);

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        /* TODO:
        ref = doc(firestore, users/user.id)
        const data = {id: user.id}  
        // will store things like username, email later
        setDoc(ref, data, {merge: true})
        */

        const data = {
          user_id: user.uid
        };
        const ref = doc(users, data.user_id);
        setDoc(ref, data, { merge: true });

        router.push('/dashboard');
      }
    });
  };

  monitorAuthState();

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <LoginForm></LoginForm>
        <Button text="Login with Google" onClick={handleGoogleSignIn}></Button>
        <br></br>
        <Button text="Sign up" href="/signup"></Button>
      </div>
    </div>
  );
}

export default Page;
