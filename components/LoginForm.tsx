'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import handleGoogleSignIn from '@/utils/google-ver';
import signIn from '../utils/signin';
import { useRouter } from 'next/navigation';
import { UserCredential } from 'firebase/auth';
import Button from './Button';
import { FaGoogle } from 'react-icons/fa';
import { FirebaseError } from 'firebase/app';

const LoginForm: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showError, setError] = useState<string>('');

  const router = useRouter();

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      result,
      error
    }: { result: UserCredential | null; error: Error | null } = await signIn(
      email,
      password
    );

    if (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            // Handle user not found error
            setError('Email not registered');
            break;
          case 'auth/wrong-password':
            setError('Wrong password');
            // Handle wrong password error
            break;
          case 'auth/network-request-failed':
            setError('Network connection error. Please retry');
            // Handle network request failed error
            break;
          default:
            setError('Unknown error occured');
            break;
        }
      } else {
        setError('Unknown error occured');
      }
      return console.log(error);
    }

    // else successful
    // console.log(result);
    return router.push('/dashboard');
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div>
        <form onSubmit={handleForm} className="flex flex-col">
          <label htmlFor="email">
            {/* <p className="text-xl text-accent">Email</p> */}
            <input
              onChange={handleEmailChange}
              required
              type="email"
              name="email"
              id="email"
              placeholder="Username"
              className="w-full rounded-md px-3 py-2 text-sm"
            />
          </label>
          <label htmlFor="password">
            <input
              onChange={handlePasswordChange}
              required
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="mt-4 w-full rounded-md px-3 py-2 text-sm"
            />
          </label>
          <div className="mt-4 px-3 font-sans text-sm text-red-500">
            {showError}
          </div>
          <Button
            type="submit"
            text="Login"
            className="mt-4"
            size="sm"
            theme="secondary"
          />
        </form>
      </div>

      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-zinc-500">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        text="Google"
        theme="primary"
        size="sm"
        onClick={handleGoogleSignIn}
        icon={<FaGoogle className="mr-2" />}
        className="mt-4 w-full justify-center"
      />
    </>
  );
};

export default LoginForm;
