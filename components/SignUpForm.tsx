'use client';
import { useState, ChangeEvent, use } from 'react';
import signUp from '../utils/signup';
import { useRouter } from 'next/navigation';
import { UserCredential } from 'firebase/auth';
import Button from './Button';
import { FirebaseError } from 'firebase/app';
const SignUpForm: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmpassword, setConfirmPassword] = useState<string>('');
  const [mismatchError, setMismatchError] = useState<boolean>(false);
  const [showError, setError] = useState<string>('');
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmpassword) {
      setError('Password confirmation does not match password');
      return;
    }
    setMismatchError(false);

    const {
      result,
      error
    }: { result: UserCredential | null; error: Error | null } = await signUp(
      email,
      password
    );

    if (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/weak-password':
            setError('Password should be at least 6 characters');
            break;
          case 'auth/email-already-in-use':
            setError('An account with this email adress already existed');
            break;
          default:
            setError('Unknown error occured, refer to console');
        }
      }
      return console.log(error);
    }

    // else successful
    console.log(result);
    router.push('/login');
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };
  return (
    <div>
      <form onSubmit={handleForm} className="flex flex-col">
        <div>
          <label htmlFor="email">
            <p className="text-md font-sans text-accent">Email</p>
            <input
              onChange={handleEmailChange}
              required
              type="email"
              name="username"
              id="username"
              placeholder="Email"
              className="w-full rounded-md px-3 py-2 text-sm"
            />
          </label>
          <label htmlFor="password">
            <p className="text-md mt-2 font-sans text-accent">Password</p>
            <input
              onChange={handlePasswordChange}
              required
              type="password"
              name="password"
              id="password"
              placeholder="*********"
              className="w-full rounded-md px-3 py-2 text-sm"
            />
          </label>
          <label htmlFor="confirmPassword">
            <p className="text-md mt-2 font-sans text-accent">
              Password confirmation
            </p>
            <input
              onChange={handleConfirmPasswordChange}
              required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="*********"
              className="w-full rounded-md px-3 py-2 text-sm"
            />
          </label>
        </div>
        <div className="my-4 flex flex-col justify-center">
          {showError && (
            <div className="flex items-center font-sans text-sm text-red-500">
              {showError}
            </div>
          )}
          <Button
            type="submit"
            text="Sign up"
            size="sm"
            className="mt-4 w-full px-4"
            theme="secondary"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
