'use client';
import { useState, ChangeEvent } from 'react';
import signUp from '../utils/signup';
import { useRouter } from 'next/navigation';
import { UserCredential } from 'firebase/auth';
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
    <form onSubmit={handleForm}>
      <label htmlFor="email">
        <p>Email</p>
        <input
          onChange={handleEmailChange}
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
          onChange={handlePasswordChange}
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
