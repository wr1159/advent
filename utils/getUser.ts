import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function getUserId(): Promise<string | undefined> {
  return new Promise<string | undefined>(async (resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        resolve(uid);
      } else {
        resolve(undefined);
      }
    });
  });
}
