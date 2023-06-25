import {
  getDoc,
  doc
} from 'firebase/firestore';
import { firestore } from '@/firebaseconfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAllTemplateIds } from './save-template';


export type Event = {
  id: string;
  name: string;
  date: string;
};

export default function queryForTemplate(
  uid: string,
  eventId: string
): Promise<Record<string, string> | undefined> {
  return new Promise<Record<string, string> | undefined>(async (resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const template = await queryTemplate(uid, eventId);
        console.log(template);
        // resolve(template);
        resolve(template);
      } else {
        resolve(undefined);
      }
    });
  });
}

async function queryTemplate(
  uid: string,
  eventId: string
): Promise<Record<string, string> | undefined> {
  const templateId = await getAllTemplateIds(uid, eventId);
  const firstTemplateId = templateId[0];
  console.log('Template ID:', firstTemplateId);
  try {
    const template = await getDoc(
      doc(
        firestore,
        `users/${uid}/events/${eventId}/templates/${firstTemplateId}`
      )
    );
    console.log('Query 1 completed', template.data());
    return template.data();
  } catch {
    console.log('Query 1 failed');
    return undefined;
  }
}
