'use client';
import AttendeeTable from '@/components/Attendee/AttendeeTable';
import { PageProps } from '@/types/PageProps';
import { queryAttendees } from '@/utils/queryAttendees';
import { useEffect, useState } from 'react';

export default function EventStatistics({ params }: { params: PageProps }) {
  const [attendees, setAttendees] = useState<any>([]);
  useEffect(() => {
    const fetchAttendees = async () => {
      const fetchedAttendees = await queryAttendees(
        params.userId,
        params.eventId
      );
      setAttendees(fetchedAttendees);
    };

    fetchAttendees();
  }, []);

  return (
    <div className="p-4 ">
      <h1 className="pb-2 text-lg font-semibold text-accent">Attendee List</h1>
      {attendees ? (
        // <p>rendered</p>

        // attendees
        <AttendeeTable attendees={attendees} />
      ) : (
        <p>Loading attendees...</p>
      )}
    </div>
  );
}
