'use client';
import AttendeeTable from '@/components/Attendee/AttendeeTable';
import ChartContainer from '@/components/Chart';
import { PageProps } from '@/types/PageProps';
import { queryAttendees } from '@/utils/queryAttendees';
import { useEffect, useState } from 'react';

export default function EventStatistics({ params }: { params: PageProps }) {
  const [attendees, setAttendees] = useState<any>([]);
  const [attendeesWithSubmittedDay, setAttendeesWithSubmitDay] = useState<any>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchAttendees = async () => {
      const fetchedAttendees = await queryAttendees(
        params.userId,
        params.eventId
      );
      const attendeesWithSubmittedDay = fetchedAttendees?.map((attendant) => {
        // Exclude unwanted attributes
        const { includePayment, productId, price, ...restAttributes } =
          attendant;

        // Convert submitTime to submittedDay
        const submittedDay = attendant.submitTime?.toString().split('T')[0];

        return {
          ...restAttributes, // Spread the rest of the attributes
          submittedDay // Add the new submittedDay attribute
        };
      });
      const newAttendees = fetchedAttendees?.map((attendant) => {
        // Exclude unwanted attributes
        const { includePayment, productId, price, ...restAttributes } =
          attendant;

        // Convert submitTime to submittedDay

        return {
          ...restAttributes // Spread the rest of the attributes
        };
      });
      setAttendees(newAttendees);
      setAttendeesWithSubmitDay(attendeesWithSubmittedDay);
      setLoading(true);
    };

    fetchAttendees();
  }, []);

  return (
    <div className="p-4 ">
      <h1 className="pb-2 text-lg font-semibold text-accent">Attendee List</h1>

      {attendees.length > 0 ? (
        <>
          {loading && (
            <div className="grid grid-cols-2 gap-x-2 py-4">
              <ChartContainer
                heading="Sign Ups Per Day"
                subheading="Total Sign Ups"
                colSpan={1}
                attendants={attendeesWithSubmittedDay}
                label="Sign Ups"
                param={'submittedDay'}
                chartType="line"
                type="length"
              />
              <ChartContainer
                heading="Age"
                subheading="Age"
                colSpan={1}
                attendants={attendees}
                label="Count"
                param={'age'}
                chartType="bar"
                type="select"
              />
            </div>
          )}
          <AttendeeTable attendees={attendees} />
        </>
      ) : (
        <p>No Attendees Found</p>
      )}
    </div>
  );
}
