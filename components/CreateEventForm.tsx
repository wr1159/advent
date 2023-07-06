import { useState, FormEvent, ChangeEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { users } from '@/firebaseconfig';
import {
  collection,
  doc,
  addDoc,
  CollectionReference,
  DocumentReference
} from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';

type CreateEventFormProps = {
  uid: string;
};

const CreateEventForm: React.FC<CreateEventFormProps> = ({ uid }) => {
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

    console.log({ uid } + ' called in CreatedEventForm');

    const datetime = new Date(currentTime);
    const userDocRef = doc(users, uid);
    const eventCollectionRef = collection(userDocRef, 'events');
    const CreatedEventRef = await addDoc(eventCollectionRef, {
      event_name: eventName,
      timestamp: datetime.toLocaleString('en-GB')
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
    router.push(`/dashboard/editor/${uid}/${CreatedEventRef.id}`);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button text="Create Event" theme="secondary" size="sm" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-secondary p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-medium">Create Event</h3>
            <Dialog.Close>
              <AiOutlineClose />
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Event Name:
              <input
                type="text"
                value={eventName}
                onChange={handleEventNameChange}
                className="mx-2 rounded-lg px-2"
              />
            </label>
            <div className="mt-4 flex justify-end">
              <Button type="submit" text="Create" theme="secondary" size="sm" />
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateEventForm;
