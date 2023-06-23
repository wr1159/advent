import { firestore } from '../firebaseconfig';
import { collection, doc, addDoc, setDoc } from 'firebase/firestore';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { FormData } from '@/components/Editor/Preview_Side/PreviewForm';

export default function addAttendee(
  data: FormData,
  userId: string,
  eventId: string
) {
  const eventRef = doc(firestore, `users/${userId}/events/${eventId}`);
  const attendeeCollectionRef: CollectionReference<DocumentData> = collection(
    eventRef,
    'attendees'
  );

  // Filter out the keys "textColor" and "bgColor"
  const filteredData = Object.keys(data)
    .filter((key) => key !== 'textColor' && key !== 'bgColor')
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {} as FormData);

  const attendeeDocRef = doc(attendeeCollectionRef);

  setDoc(attendeeDocRef, filteredData)
    .then(() => {
      console.log('Attendee added successfully');
    })
    .catch((error) => {
      console.error('Error adding attendee:', error);
    });
}
