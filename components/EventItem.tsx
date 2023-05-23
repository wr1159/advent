import Link from 'next/link';
import { EventOperations } from './EventOperations';

interface EventItemProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
  };
}

export function EventItem({ event }: EventItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${event.id}`}
          className="font-semibold hover:underline"
        >
          {event.title}
        </Link>
        <div>
          <p className="text-muted-foreground text-sm">{event.date}</p>
        </div>
      </div>
      <EventOperations event={{ id: event.id, title: event.title }} />
    </div>
  );
}
