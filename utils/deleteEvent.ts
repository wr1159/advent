import { firestore } from '../firebaseconfig';
import { collection, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { getAllTemplateIds } from './save-template';

export default async function deleteEvent(user_id: string, event_id: string) {
    // Delete all templates
    await getAllTemplateIds(user_id, event_id).then((Ids) => Ids.forEach((Id) => deleteDoc(doc(
        firestore,
        `users/${user_id}/events/${event_id}/templates/${Id}`
    ))));
    
    // Delete all attendees
    const attendeesRef = collection(
        firestore,
        `users/${user_id}/events/${event_id}/attendees`
    );
    const attendeesSnapshot = await getDocs(attendeesRef);

    await attendeesSnapshot.forEach((attendee) => deleteDoc(doc(firestore,
        `users/${user_id}/events/${event_id}/attendees/${attendee.id}`)));
    
    // Delete the doc
    await deleteDoc(doc(firestore,
        `users/${user_id}/events/${event_id}`)); 
    
  }