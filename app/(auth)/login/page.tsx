'use client';
import Button from '@/components/Button';
import handleGoogleSignIn from '@/utils/google-ver';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app from '@/firebaseconfig';

function Page() {
  const router = useRouter();
  const auth = getAuth(app);

  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user: User | null) => {
      console.log(user);
      if (user) {
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
