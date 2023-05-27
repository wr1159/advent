import { setUserId } from 'firebase/analytics';
import app, { firestore } from '../firebaseconfig';
import { User, getAuth } from 'firebase/auth';
import { collection, doc, addDoc, setDoc } from 'firebase/firestore';
import {
  DocumentReference,
  CollectionReference,
  DocumentData
} from 'firebase/firestore';

// import { userID } from '../app/(auth)/login/page';

const auth = getAuth(app);

export interface StyledText {
  text: string;
  attribute: string[];
}
// const userDocument = usersCollection.doc(user.uid);
export interface TemplateInterface {
  title: string[];
  description: string[];
  date: string[];
  location: string[];
  additional: StyledText[];
}
export default function saveTemplate(
  data: StyledText[],
  user_id: string,
  event_id: string,
  template_id: string
) {
  const templateRef: DocumentReference<DocumentData> = doc(
    firestore,
    `users/${user_id}/events/${event_id}/templates/${template_id}`
  );
  let additional: StyledText[] = [];

if (data.length > 4) {
  // additonal copy array from [4] beyond
}
  const added = {
    title: data[0],
    description: data[1],
    date: data[2],
    location: data[3],
    // additional: 
  };

  setDoc(templateRef, added, { merge: true });
}
