import app, { firestore } from '../firebaseconfig';
import { getAuth } from 'firebase/auth';
import { collection, doc, addDoc } from 'firebase/firestore';
import {
  CollectionReference,
  DocumentData
} from 'firebase/firestore';

const auth = getAuth(app);
const user = auth.currentUser;
export interface Attendee {
  name: string;
  gender: string;
  age: number;
}

// const user = auth.currentUser;
export default function addAttendee(
  name: string,
  age: number,
  gender: string,
  additional: string[],
  event_id: string
) {
  if (!user) {
    return;
  }
  //path: users/${user.uid}/events/${event_id}/
  const eventRef = doc(firestore, `users/${user.uid}/events/${event_id}`);
  const attendeeCollectionRef: CollectionReference<DocumentData> = collection(
    eventRef,
    'attendees'
  );

  addDoc(attendeeCollectionRef, {
    name: name,
    age: age,
    gender: gender,
    additional: additional
  });
  /*
  const userForm = doc(usersCollection, user.uid);
  const eventsCollection = collection(userForm, 'events');
  const newEvent = doc(eventsCollection);
  //    const templatesCollection = collection(newEvent, 'templates');
  const attendeesCollection = collection(newEvent, 'attendees');
  const newAttendeeRef: DocumentReference<DocumentData> =
    doc(attendeesCollection);
  */
}
