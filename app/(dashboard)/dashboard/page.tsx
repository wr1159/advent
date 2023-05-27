'use client';
import { useEffect, useState } from 'react';
import LogOut from '@/components/LogOut';
import { EventItem } from '@/components/EventItem';
import CreateEventForm from '@/components/CreateEventForm';
import queryForEvents, { Event } from '@/utils/event-query';
import { userID } from '@/app/(auth)/login/page';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  console.log(userID + ' from Dashboard');
  console.log(getAuth().currentUser);
  /*
  if (events.length == 0) {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await queryForEvents();
        if (fetchedEvents) {
          setEvents(fetchedEvents);
          console.log('Events fetched.', fetchedEvents);
        } else {
          console.log('No events found.');
        }
      } catch (error) {
        console.error('Error querying for events:', error);
      }
    };

    await fetchEvents();
  }

*/
  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const fetchedEvents = await queryForEvents();
  //     if (fetchedEvents) {
  //       setEvents(fetchedEvents);
  //     }
  //   } else {
  //   }
  // });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('1');
        const fetchedEvents = await queryForEvents();
        if (fetchedEvents) {
          console.log('2');
          setEvents(fetchedEvents);
        }
      } catch (error) {
        console.log('3');
        console.error('Error querying for events:', error);
      }
    };

    fetchEvents();
  }, []);
  /*
  useEffect(() => {
    fetchEvents();

    window.addEventListener('load', () => fetchEvents());
    window.addEventListener('popstate', () => fetchEvents());

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);
  // Call fetchEvents directly when the component is rendered
  fetchEvents();
  */

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <h1 className="text-3xl md:text-4xl">Events</h1>
          <p className="text-lg text-primary">Create and manage your events.</p>
        </div>
        <LogOut />
        <CreateEventForm />
        {/* Create button in here takes care of adding event to events array*/}
      </div>
      {events?.length ? (
        <div className="divide-border mt-5 divide-y rounded-md border">
          {events.map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-accent">
          <h2 className="text-xl md:text-2xl">No events created.</h2>
        </div>
      )}
    </div>
  );
}
