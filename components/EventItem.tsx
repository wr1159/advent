import Link from 'next/link';
import { EventOperations } from './EventOperations';
import getUserId from '@/utils/getUser';

interface EventItemProps {
  uid: string;
  event: {
    id: string;
    name: string;
    date: string;
  };
}
export function EventItem({ uid, event }: EventItemProps) {
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
      <EventOperations event={{ id: event.id, title: event.name }} uid={uid} />
    </div>
  );
}
