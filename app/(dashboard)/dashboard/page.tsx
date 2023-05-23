'use client';
import LogOut from '@/components/LogOut';
import Button from '@/components/Button';
import { EventItem } from '@/components/EventItem';

export default function Dashboard() {
  const events = [
    {
      id: '123141',
      title: 'Event 1',
      description: 'This is event 1',
      date: '2021-08-01'
    },
    {
      id: '123142',
      title: 'Event 2',
      description: 'This is event 2',
      date: '2021-08-02'
    },
    {
      id: '123143',
      title: 'Event 3',
      description: 'This is event 3',
      date: '2021-08-03'
    }
  ];
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-2">
          <h1 className="text-3xl md:text-4xl">Events</h1>
          <p className="text-lg text-primary">Create and manage your events.</p>
        </div>
        <LogOut />
        <Button text="Create Event" />
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
