'use client';
import Button from '@/components/Button';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import app, { users } from '@/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

function Page() {
  const router = useRouter();
  const auth = getAuth(app);

  const user = getAuth().currentUser;
  if (user != null) {
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
      }
    });
  };

  monitorAuthState();

  return (
    <div className="container mx-auto grid h-screen w-screen flex-col items-center justify-center">
      <Button
        text="Back"
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8"
      />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-sans text-2xl tracking-tight">Welcome back</h1>
          <h2 className="flex justify-center text-sm text-zinc-500">
            Enter your username and password to login
          </h2>
        </div>
        <LoginForm></LoginForm>

        <Link
          href="/signup"
          className="px-8 text-center text-sm text-zinc-500 underline underline-offset-4 hover:font-semibold"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Page;
