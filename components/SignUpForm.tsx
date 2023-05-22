'use client';
import React from 'react';
import signUp from '../app/firebase/auth/signup';
import handleGoogleSignIn from '../app/firebase/auth/google-ver';
import { useRouter } from 'next/navigation';

const SignUpForm: React.FC<{}> = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push('/admin');
  };
  return (
    <form onSubmit={handleForm} className="form">
      <label htmlFor="email">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
        />
      </label>
      <label htmlFor="password">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
