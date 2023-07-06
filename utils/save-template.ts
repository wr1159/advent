import app, { firestore } from '../firebaseconfig';
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { DocumentReference, DocumentData } from 'firebase/firestore';

// import { userID } from '../app/(auth)/login/page';

const auth = getAuth(app);

export interface StyledText {
  label: string;
  value: string;
  // attribute: string[];
}
// const userDocument = usersCollection.doc(user.uid);
export interface TemplateInterface {
  title: string[];
  description: string[];
  date: string[];
  location: string[];
  additional: StyledText[];
}

export async function getAllTemplateIds(userId: string, eventId: string) {
  const templatesRef = collection(
    firestore,
    `users/${userId}/events/${eventId}/templates`
  );

  const templateSnapshot = await getDocs(templatesRef);
  const templateIds: string[] = [];

  templateSnapshot.forEach((templateDoc) => {
    templateIds.push(templateDoc.id);
  });

  return templateIds;
}

export default function saveTemplate(
  // data: StyledText[],
  data: Record<string, string>,
  // htmlContent: string,
  // deltaState: any,
  // backgroundColor: string,
  // textColor: string,
  // data: string[],
  user_id: string,
  event_id: string,
  template_id: string
) {
  const templateRef: DocumentReference<DocumentData> = doc(
    firestore,
    `users/${user_id}/events/${event_id}/templates/${template_id}`
  );

  // const added = data.reduce((result: Record<string, string>, item) => {
  //   result[item.label] = item.value;
  //   return result;
  // }, {});
  // const result= {
  //   htmlContent: htmlContent,
  //   deltaState: JSON.stringify(deltaState)
  // }

  setDoc(templateRef, data);
}
