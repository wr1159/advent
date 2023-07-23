'use client';
import queryForEvents, { Event } from '@/utils/eventQuery';
import { parse, compareDesc } from 'date-fns';
import { useEffect, useState } from 'react';
import getUserId from '@/utils/getUser';
import LinkCard from '@/components/LinkCard';

export default function Statistics() {
  const [events, setEvents] = useState<Event[]>([]);
  const [uid, setUid] = useState<string>('');
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await queryForEvents();
        if (fetchedEvents) {
          // sort by descending order
          console.log(fetchedEvents);
          const sortedEvents = fetchedEvents.sort((a, b) => {
            const dateA = parse(a.date, 'dd/MM/yyyy, HH:mm:ss', new Date());
            const dateB = parse(b.date, 'dd/MM/yyyy, HH:mm:ss', new Date());
            return compareDesc(dateA, dateB);
          });
          console.log(sortedEvents);
          setEvents(sortedEvents);
        }
        const userId = (await getUserId()) ?? '';
        if (userId !== '') {
          setUid(userId);
        }
      } catch (error) {
        console.error('Error querying for events:', error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div className="m-10 flex flex-col space-y-5">
      <h1 className="text-3xl font-semibold">Data at a glance</h1>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {events?.length ? (
          <>
            {events.map((event) => (
              <LinkCard
                key={event.id}
                title={event.name}
                body={`${event.date} \n Attendees: ${event.attendees}`}
                href={`/dashboard/statistics/${uid}/${event.id}`}
              />
            ))}
          </>
        ) : (
          <div className="text-accent">
            <h2 className="text-xl md:text-2xl">Waiting for events.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
