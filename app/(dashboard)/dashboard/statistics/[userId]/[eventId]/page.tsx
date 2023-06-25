'use client';
import { PageProps } from '@/types/PageProps';
import { queryAttendees } from '@/utils/queryAttendees';
import { useEffect, useState } from 'react';

export default function Statistics({ params }: { params: PageProps }) {
  const [attendees, setAttendees] = useState({});
  useEffect(() => {
    const fetchAttendee = async () => {
      try {
        const attendeeData = await queryAttendees(
          params.userId,
          params.eventId
        );
        if (attendeeData) {
          console.log(attendeeData);
          setAttendees(attendeeData);
        }
      } catch (error) {
        console.error('Error querying for events:', error);
      }
    };
    fetchAttendee();
  }, []);
  return;
}
