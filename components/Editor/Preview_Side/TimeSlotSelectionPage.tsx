'use client';
import React, { useState, ChangeEvent } from 'react';
import { FormWrapper } from './FormWrapper';
import { FormData } from './PreviewForm';

interface DateOption {
  value: string;
  label: string;
}

type TimeSlotSelection = {
  dateOptions: DateOption[];
  timeSlotOptions: string[];
};
// type TimeData = {
//   selectedDate: string,
//   selectedTimeframe: string
// }
// type TimeslotPageProps = TimeData & {
//   updateFields: (fields: Partial<TimeData>) => void
// }
// export default function TimeSlotSelectionPage ({selectedDate, selectedTimeframe, updateFields} : TimeslotPageProps) {
export default function TimeSlotSelectionPage({
  data,
  updateFields,
  imageUrls
}: {
  data: FormData;
  updateFields: (fields: Partial<FormData>) => void;
  imageUrls: string[];
}) {
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
    <FormWrapper data={data} title="Timeslot Selection" imageUrls={imageUrls}>
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
        <div className="ml-8 ">
          <h2 className="mb-6 text-2xl font-bold">Select Timeslots</h2>
          <div className="space-y-2">
            {timeSlotsOptions.map((timeslot, index) => (
              <label key={index} className="flex items-center">
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
    </FormWrapper>
  );
}
