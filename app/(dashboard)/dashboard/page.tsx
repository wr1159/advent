'use client';
import { useEffect, useState } from 'react';
import LogOut from '@/components/LogOut';
import { EventItem } from '@/components/EventItem';
import CreateEventForm from '@/components/CreateEventForm';
import queryForEvents, { Event } from '@/utils/event-query';

export default async function Dashboard() {
  const [events, setEvents] = useState<Event[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  /*
  let events: Event[] | undefined = [];
  events = await queryForEvents();
  */
  // console.log(events);
  /*
   useEffect(() => {
    queryForEvents()
      .then((fetchedEvents: Event[]| undefined) => {
        if (fetchedEvents) {
          setEvents(fetchedEvents);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error querying for events:', error);
        setLoading(false);
      });
  }, []);
  */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const fetchedEvents = await queryForEvents();
        if (fetchedEvents) {
          setEvents(fetchedEvents);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error querying for events:', error);
        setLoading(false);
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
        <LogOut />
        <CreateEventForm />{' '}
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
