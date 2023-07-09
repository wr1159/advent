'use client';
import { useState, ChangeEvent } from 'react';
import signUp from '../utils/signup';
import { useRouter } from 'next/navigation';
import { UserCredential } from 'firebase/auth';
import Button from './Button';
const SignUpForm: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      result,
      error
    }: { result: UserCredential | null; error: Error | null } = await signUp(
      email,
      password
    );

    if (error) {
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
  return (
    <div>
      <form onSubmit={handleForm} className="flex flex-col">
        <div>
          <label htmlFor="email">
            <p className="font-sans text-lg text-accent">Username</p>
            <input
              onChange={handleEmailChange}
              required
              type="email"
              name="username"
              id="username"
              placeholder="Username"
              className="w-full rounded-md px-3 py-2 text-sm"
            />
          </label>
          <label htmlFor="password">
            <p className="mt-2 font-sans text-lg text-accent">Password</p>
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
        </div>
        <Button
          type="submit"
          text="Sign up"
          size="sm"
          className="mt-6 w-full px-4"
          theme="secondary"
        />
      </form>
    </div>
  );
};

export default SignUpForm;
