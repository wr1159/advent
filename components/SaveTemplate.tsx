import app, { firestore } from '@/firebaseconfig';
import { User, getAuth } from 'firebase/auth';
import { collection, doc, addDoc, setDoc } from 'firebase/firestore';
import {
  DocumentReference,
  CollectionReference,
  DocumentData
} from 'firebase/firestore';
export const usersCollection = collection(firestore, 'users');

const auth = getAuth(app);
const user = auth.currentUser;
interface Attendee {
  name: string;
  gender: string;
  age: number;
}

// const user = auth.currentUser;
export function addAttendee(
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
  const event_ref = doc(firestore, `users/${user.uid}/events/${event_id}`);
  const attendeeCollectionRef: CollectionReference<DocumentData> = collection(
    event_ref,
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

// return a
interface StyledText {
  text: string;
  size: string;
  colour: string;
  styling: string;
}
// const userDocument = usersCollection.doc(user.uid);

export function saveNote(
  title: StyledText,
  description: StyledText,
  date: StyledText,
  location: StyledText,
  additional: StyledText[],
  event_id: string,
  template_id: string
) {
  if (!user) {
    return;
  }
  const event_ref: DocumentReference<DocumentData> = doc(
    firestore,
    `users/${user.uid}/events/${event_id}/templates/${template_id}`
  );
}
