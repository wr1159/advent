import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import app from '@/firebaseconfig';
import { getAuth, signOut, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth(app);

const LogOut: React.FC<{}> = () => {
  const router = useRouter();
  const logout = async (): Promise<void> => {
    await signOut(auth);
    redirection();
  };

  const redirection = async (): Promise<void> => {
    onAuthStateChanged(auth, (user: User | null) => {
      console.log(user);
      router.push('/');
    });
  };
  return <Button text="Logout" onClick={logout} size="sm" />;
};

export default LogOut;
