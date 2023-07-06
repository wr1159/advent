import LineChart from '@/components/Charts/LineChart';
import ChartContainer from '@/components/Chart';
import LineChartContainer from '@/components/Chart';

export interface mockAttendant {
  name: string;
  signUpDate: Date;
  attendingDay: number;
  country: string;
}

export default function Statistics() {
  const attendants: mockAttendant[] = [
    {
      name: 'John',
      signUpDate: new Date('2023-05-24'),
      attendingDay: 1,
      country: 'Singapore'
    },
    {
      name: 'Emma',
      signUpDate: new Date('2023-05-24'),
      attendingDay: 1,
      country: 'Malaysia'
    },
    {
      name: 'Liam',
      signUpDate: new Date('2023-05-25'),
      attendingDay: 1,
      country: 'Indonesia'
    },
    {
      name: 'Olivia',
      signUpDate: new Date('2023-05-25'),
      attendingDay: 3,
      country: 'Singapore'
    },
    {
      name: 'Noah',
      signUpDate: new Date('2023-05-25'),
      attendingDay: 2,
      country: 'Malaysia'
    },
    {
      name: 'Ava',
      signUpDate: new Date('2023-05-26'),
      attendingDay: 3,
      country: 'Indonesia'
    }
  ];

  return (
    <div className="m-10 flex flex-col space-y-5">
      <h1 className="text-3xl font-semibold">Data at a glance</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ChartContainer
          heading="Total Registrants Trend"
          subheading="Number of Registrants"
          attendants={attendants}
          param="signUpDate"
          label="Sign-ups per Day"
          colSpan={1}
          chartType="line"
        />
        <ChartContainer
          heading="Total Attendees Trend"
          subheading="Number of Attendees"
          attendants={attendants}
          param="attendingDay"
          label="Attendees on the day"
          colSpan={1}
          chartType="bar"
        />
      </div>
    </div>
  );
}
