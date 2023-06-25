'use client';
import { PageProps } from '@/types/PageProps';
import { queryAttendees } from '@/utils/queryAttendees';
import { useEffect } from 'react';

export default function Statistics({ params }: { params: PageProps }) {
  useEffect(() => {
    const fetchAttendee = async () => {
      try {
        const attendeeData = await queryAttendees(
          params.userId,
          params.eventId
        );
        if (attendeeData) {
          console.log(attendeeData);
        }
      } catch (error) {
        console.error('Error querying for events:', error);
      }
    };
    fetchAttendee();
  }, []);
  return <div>Turtles</div>;
}
