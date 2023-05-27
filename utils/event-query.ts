import app from '@/firebaseconfig';
import {
  collection,
  query,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  QuerySnapshot,
  Query
} from 'firebase/firestore';
import { firestore } from '@/firebaseconfig';
import { Auth, User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { userID } from '@/app/(auth)/login/page';

export type Event = {
  id: string;
  name: string;
  date: string;
};

export default async function queryForEvents() {
  let uid = '';

  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //      uid = user.uid;
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  const allEvents: Query<DocumentData> = query(
    collection(firestore, `users/${userID}/events`)
  );
  console.log('Query 1 completed', allEvents);

  getDocs(allEvents).then((querySnapshot: QuerySnapshot<DocumentData>) => {
    console.log('Query 2 Completed:', querySnapshot);
    // Additional code with querySnapshot
  });

  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(allEvents);

  const allDocs: QueryDocumentSnapshot<DocumentData>[] = querySnapshot.docs;

  if (allDocs.length == 0) {
    return;
  }
  const events: Event[] = allDocs.map(
    (item: QueryDocumentSnapshot<DocumentData>) => ({
      id: item.id,
      name: item.get('event_name'),
      date: item.get('timestamp')
    })
  );
  console.log('Query 3 completed', events);
  return events;
}
