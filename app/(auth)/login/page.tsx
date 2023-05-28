'use client';
import Button from '@/components/Button';
import handleGoogleSignIn from '@/utils/google-ver';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app, { users } from '@/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import { FaGoogle } from 'react-icons/fa';

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
    <div className="flex h-screen flex-col items-center">
      <div className="w-screen p-8">
        <Button text="Back" href="/" />
      </div>
      <div className="-mt-12 flex h-full flex-col items-center justify-center">
        <div className="form-wrapper">
          <LoginForm></LoginForm>
          <div className="mt-4">
            <Button
              text="Login with Google"
              theme="primary"
              onClick={handleGoogleSignIn}
              icon={<FaGoogle className="mr-2" />}
            />
          </div>
          <br></br>
        </div>
        <Button text="Sign up" href="/signup" theme="secondary" />
      </div>
    </div>
  );
}

export default Page;
