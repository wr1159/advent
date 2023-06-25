import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebaseconfig';

export async function queryAttendees(
  userId: string,
  eventId: string
): Promise<any[] | undefined> {
  try {
    const attendeesRef = collection(
      firestore,
      `users/${userId}/events/${eventId}/attendees`
    );
    const attendeesSnapshot = await getDocs(attendeesRef);
    const attendeesData: any[] = [];

    attendeesSnapshot.forEach((attendeeDoc) => {
      attendeesData.push(attendeeDoc.data());
    });

    return attendeesData;
  } catch (error) {
    console.error('Failed to query attendees:', error);
    return undefined;
  }
}
