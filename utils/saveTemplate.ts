import { firestore } from '../firebaseconfig';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { DocumentReference, DocumentData } from 'firebase/firestore';

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
  data: Record<string, string>,
  user_id: string,
  event_id: string,
  template_id: string
) {
  const templateRef: DocumentReference<DocumentData> = doc(
    firestore,
    `users/${user_id}/events/${event_id}/templates/${template_id}`
  );

  setDoc(templateRef, data);
}
