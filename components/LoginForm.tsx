'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import signIn from '../utils/signin';
import { useRouter } from 'next/navigation';
import { UserCredential } from 'firebase/auth';
import Button from './Button';

/* const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');

const router = useRouter();
*/

const LoginForm: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
    <div>
      <div>
        <form onSubmit={handleForm} className="form flex flex-col">
          <label htmlFor="email">
            <p className="text-xl text-accent">Email</p>
            <input
              onChange={handleEmailChange}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full rounded-md py-0.5 pl-0.5 pr-2"
            />
          </label>
          <label htmlFor="password">
            <p className="mt-2 text-xl text-accent">Password</p>
            <input
              onChange={handlePasswordChange}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full rounded-md py-0.5 pl-0.5 pr-2"
            />
          </label>
          <Button
            type="submit"
            text="Sign In"
            className="mt-4 h-full"
            size="sm"
            theme="secondary"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
