'use client';
import Button from '@/components/Button';
import handleGoogleSignIn from '@/utils/google-ver';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app, { firestore, users } from '@/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';

let userID = '';
function Page() {
  const router = useRouter();
  const auth = getAuth(app);
  console.log(auth.currentUser + ' from login Page');
  console.log(getAuth().currentUser + ' from login Page');
  if (getAuth().currentUser) {
    router.push('/dashboard');
  }

  const monitorAuthState = () => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        userID = user.uid;
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
    <div className="flex h-screen items-center justify-center">
      <div className="form-wrapper">
        <LoginForm></LoginForm>
        <div>
          <Button
            text="Login with Google"
            type="secondary"
            onClick={handleGoogleSignIn}
          />
        </div>
        <br></br>
        <Button text="Sign up" href="/signup" />
      </div>
    </div>
  );
}
export default Page;
