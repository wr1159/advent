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
import { Auth, User, getAuth } from 'firebase/auth';

export type Event = {
  id: string;
  name: string;
  date: string;
};
const auth: Auth = getAuth(app);
const user: User | null = auth.currentUser;

export default async function queryForEvents() {
  if (!user) {
    return;
  }

  const allEvents: Query<DocumentData> = query(
    collection(firestore, `users/${user.uid}/events`)
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
