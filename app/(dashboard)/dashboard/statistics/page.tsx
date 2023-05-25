import LineChart from '@/components/Charts/LineChart';

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
      attendingDay: 2,
      country: 'Indonesia'
    },
    {
      name: 'Olivia',
      signUpDate: new Date('2023-05-25'),
      attendingDay: 2,
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
      <div className="flex w-3/5 flex-col content-between justify-between overflow-hidden rounded-md border bg-white p-4 lg:flex-row">
        <div className="start-0 flex flex-row lg:flex-col">
          <h1 className="text-medium">Total Registrants Trend</h1>
          <h2 className="text-sm text-primary">
            Number of Registrants per Day
          </h2>
          <h1 className="text-3xl font-bold lg:py-4">{attendants.length}</h1>
          <h2 className="text-sm text-primary">
            <span className="text-green-500">+4</span> vs last 7 days
          </h2>
        </div>
        <LineChart
          data={attendants}
          param="attendingDay"
          label="Sign-ups per Day"
        />
      </div>
    </div>
  );
}
