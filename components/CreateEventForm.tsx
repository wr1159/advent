import { useState, FormEvent, ChangeEvent } from 'react';
import { Event } from '@/utils/event-query';
import Popup from 'reactjs-popup';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { users } from '@/firebaseconfig';
import {
  collection,
  doc,
  addDoc,
  CollectionReference,
  DocumentReference
} from 'firebase/firestore';
import { userID } from '@/app/(auth)/login/page';

type CreateEventFormProps = {
  array: Event[];
};

const CreateEventForm: React.FC<{}> = () => {
  const [eventName, setEventName] = useState('');

  const handleEventNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTime = Date.now();
    /* array.push
    when click create 
      create collection of events, path: users/user.id/events
    const collectionref = users/user.id/events
    create a event document {eventName, timestamp}
    addDoc(collectionref, {})
    then 
    create a template collection, path: users/user.id/events/

    Save Note button:
    write to doc 
    users/user.id/events/event.id/templates/template.id
    await addDoc(eventsCollection, {
      title
      desc
      ...
    });
    */
   
    /*
    const auth = getAuth();

    if (!auth.currentUser) {
      console.log('user is not logged in. HOW?');
      return;
    }
    */

    console.log({userID} + ' called in CreatedEventForm');

    const datetime = new Date(currentTime);
    const userDocRef = doc(users, userID);
    const eventCollectionRef = collection(userDocRef, 'events');
    const CreatedEventRef = await addDoc(eventCollectionRef, {
      event_name: eventName,
      timestamp: datetime.toLocaleString()
    });

    const templateCollectionRef: CollectionReference = collection(
      CreatedEventRef,
      'templates'
    );
    const CreatedTemplateRef: DocumentReference = await addDoc(
      templateCollectionRef,
      {
        event_id: CreatedEventRef.id
      }
    );

    setEventName('');
    // router.push(`/editor/${CreatedEventRef.id}/${CreatedTemplateRef.id}`);
  };

  return (
    <Popup
      trigger={<button>Create Event</button>}
      modal // Enable modal behavior
      closeOnDocumentClick // Close the popup when clicking outside
      contentStyle={{
        background: 'rgba(0, 0, 0, 0.8)', // Background color for the popup
        width: '400px', // Width of the popup
        padding: '20px', // Padding inside the popup
        borderRadius: '8px', // Border radius for the popup
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' // Box shadow for the popup
      }}
      overlayStyle={{
        background: 'rgba(0, 0, 0, 0.5)' // Background color for the overlay (blurred background)
      }}
      position="center center" // Position the popup in the center of the screen
    >
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Event Name:
            <input
              type="text"
              value={eventName}
              onChange={handleEventNameChange}
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </Popup>
  );
};

export default CreateEventForm;
