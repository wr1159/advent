'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import signIn from '../utils/signin';
import { useRouter } from 'next/navigation';
import { UserCredential } from 'firebase/auth';

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
    console.log(result);
    return router.push('/dashboard');
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-70 mb-30" data-align="center">
          Sign in
        </h1>
        <form onSubmit={handleForm} className="form">
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
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
