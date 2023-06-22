'use client';
import TimeSlotInsertion from '@/components/Editor/Editor_Side/TimeSlotInsertion';
import React, { useState, ChangeEvent } from 'react';
interface DateOption {
  value: string;
  label: string;
}

type TimeSlotSelection = {
  dateOptions: DateOption[];
  timeSlotOptions: string[];
};

const TimeSlotSelection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeslots, setSelectedTimeslots] = useState<string>('');

  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };
  const dateOptions: DateOption[] = [
    { value: '2023-06-18', label: 'June 18, 2023' },
    { value: '2023-06-19', label: 'June 19, 2023' },
    { value: '2023-06-20', label: 'June 20, 2023' }
    // ... add more date options
  ];
  const timeSlotsOptions: string[] = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM'
  ];

  const handleTimeslotChange = (timeslot: string) => {
    /*  logic for selecting multiple timeslot
     const isSelected = selectedTimeslots.includes(timeslot);
     let updatedTimeslots: string[] = [];

     if (isSelected) {
       updatedTimeslots = selectedTimeslots.filter((ts) => ts !== timeslot);
     } else {
       updatedTimeslots = [...selectedTimeslots, timeslot];
     }
     setSelectedTimeslots(updatedTimeslots);
    */

    setSelectedTimeslots(timeslot);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <TimeSlotInsertion />
      <div className="flex w-full max-w-3xl rounded-lg bg-white p-8">
        <div className="w-2/3">
          <h2 className="mb-6 text-2xl font-bold">Select a Date</h2>
          <div className="mb-4">
            <label htmlFor="date" className="mb-1 block font-medium">
              Date:
            </label>
            <select
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">Select a date</option>
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="ml-8 w-1/3">
          <h2 className="mb-6 text-2xl font-bold">Select Timeslots</h2>
          <div className="space-y-2">
            {timeSlotsOptions.map((timeslot) => (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTimeslots.includes(timeslot)}
                  onChange={() => handleTimeslotChange(timeslot)}
                  className="mr-2"
                />{' '}
                {timeslot}
              </label>
            ))}
          </div>
        </div>
      </div>
      <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Book Now
      </button>
    </div>
  );
};

export default TimeSlotSelection;
