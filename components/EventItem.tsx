import Link from 'next/link';
import { EventOperations } from './EventOperations';
import { Event } from '@/utils/event-query';
import { SetStateAction, Dispatch } from 'react';

interface EventItemProps {
  uid: string;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  event: {
    id: string;
    name: string;
    date: string;
  };
}
export function EventItem({ uid, events, setEvents, event }: EventItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/editor/${uid}/${event.id}`}
          className="font-semibold hover:underline"
        >
          {event.name}
        </Link>
        <div>
          <p className="text-muted-foreground text-sm">{event.date}</p>
        </div>
      </div>
      <EventOperations
        event={{ id: event.id, title: event.name }}
        events={events}
        setEvents={setEvents}
        uid={uid}
      />
    </div>
  );
}
