import { firestore } from '../firebaseconfig';
import { collection, doc, addDoc, setDoc, getDocs } from 'firebase/firestore';
import { DocumentReference, DocumentData } from 'firebase/firestore';

export interface StyledText {
  label: string;
  value: string;
  // attribute: string[];
}

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
  const added = data.reduce((result: Record<string, string>, item) => {
    result[item.label] = item.value;
    return result;
  }, {});

  setDoc(templateRef, added);
}
