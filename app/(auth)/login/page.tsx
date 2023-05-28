'use client';
import Button from '@/components/Button';
import handleGoogleSignIn from '@/utils/google-ver';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app, { users } from '@/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';

function Page() {
  const router = useRouter();
  const auth = getAuth(app);
  console.log(auth.currentUser + ' from login Page');
  console.log(getAuth().currentUser + ' from login Page');

  const user = getAuth().currentUser;
  if (user != null) {
    // router.push(`/dashboard/${user.uid}`);
    router.push(`/dashboard/`);
    return;
  }

  const monitorAuthState = () => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const data = {
          user_id: user.uid
        };
        const ref = doc(users, data.user_id);
        setDoc(ref, data, { merge: true });
        router.push(`/dashboard`);
        // router.push(`/dashboard/${user.uid}`);
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
            theme="secondary"
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
