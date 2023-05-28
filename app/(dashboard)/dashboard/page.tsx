'use client';
import { useEffect, useState } from 'react';
import LogOut from '@/components/LogOut';
import { EventItem } from '@/components/EventItem';
import CreateEventForm from '@/components/CreateEventForm';
import queryForEvents, { Event } from '@/utils/event-query';
import getUserId from '@/utils/getUser';
export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [uid, setUid] = useState<string>('');
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('1');
        const fetchedEvents = await queryForEvents();
        if (fetchedEvents) {
          console.log('2');
          // sort by descending order
          setEvents(fetchedEvents.sort((a, b) => (a.date < b.date ? 1 : -1)));
        }
        const userId = (await getUserId()) ?? '';
        if (userId !== '') {
          setUid(userId);
        }
      } catch (error) {
        console.log('3');
        console.error('Error querying for events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <h1 className="text-3xl md:text-4xl">Events</h1>
          <p className="text-lg text-primary">Create and manage your events.</p>
        </div>
        <CreateEventForm uid={uid} />
        {/* Create button in here takes care of adding event to events array*/}
      </div>
      {events?.length ? (
        <div className="divide-border mt-5 divide-y rounded-md border">
          {events.map((event) => (
            <EventItem uid={uid} key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-accent">
          <h2 className="text-xl md:text-2xl">Waiting for events.</h2>
        </div>
      )}
    </div>
  );
}
