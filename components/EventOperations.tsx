'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import deleteEvent from '@/utils/deleteEvent'; 
import { Event } from '@/utils/event-query';
import { Dispatch, SetStateAction } from 'react';

interface EventOperationProps {
  event: {
    id: string;
    title: string;
  };
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>
  uid: string;
}

export function EventOperations({ event, events, setEvents, uid }: EventOperationProps) {
  const handleDelete= () => {
    setEvents(events.filter((ev) => ev.id !== event.id));
    deleteEvent(uid, event.id);
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border bg-accent transition-colors hover:bg-secondary">
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="b- rounded-md border bg-background p-1 text-accent shadow-md"
        >
          <DropdownMenuItem className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-secondary focus:text-accent">
            <Link href={`/dashboard/editor/${uid}/${event.id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="-mx-1 my-1 h-px bg-accent" />
          <DropdownMenuItem
            //TODO change text-red-500 to a destructive color in tailwindconfig like text-destructive
            className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none transition-colors focus:bg-secondary focus:text-red-500"
            onSelect={handleDelete}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
