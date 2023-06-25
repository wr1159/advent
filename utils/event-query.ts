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
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export type Event = {
  id: string;
  name: string;
  date: string;
  attendees: number;
};

export default function queryForEvents(): Promise<Event[] | undefined> {
  return new Promise<Event[] | undefined>(async (resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const events = await queryEvents(uid);
        resolve(events);
      } else {
        resolve(undefined);
      }
    });
  });
}

async function queryEvents(uid: string): Promise<Event[] | undefined> {
  const allEvents: Query<DocumentData> = query(
    collection(firestore, `users/${uid}/events`)
  );
  console.log('Query 1 completed', allEvents);

  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(allEvents);
  console.log('Query 2 Completed:', querySnapshot);

  const allDocs: QueryDocumentSnapshot<DocumentData>[] = querySnapshot.docs;

  if (allDocs.length === 0) {
    return undefined;
  }

  console.log('allDocs', allDocs);

  const events: Promise<Event>[] = allDocs.map(
    async (item: QueryDocumentSnapshot<DocumentData>) => {
      const attendeesCollection = collection(
        firestore,
        `users/${uid}/events/${item.id}/attendees`
      );
      const attendeesQuery = query(attendeesCollection);
      const attendeesSnapshot = await getDocs(attendeesQuery);
      const numAttendees = attendeesSnapshot.size;
      return {
        id: item.id,
        name: item.get('event_name'),
        date: item.get('timestamp'),
        // get number of documents in attendees.
        attendees: numAttendees
      };
    }
  );
  const resolvedEvents = await Promise.all(events);
  console.log('Query 3 completed', resolvedEvents);
  return resolvedEvents;
}
