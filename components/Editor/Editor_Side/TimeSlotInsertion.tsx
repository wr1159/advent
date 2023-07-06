import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import { FormWrapper } from '../Preview_Side/FormWrapper';

interface Row {
  eventDate: string;
  timeslot: string;
}
interface Slots {
  eventDate: string;
  timeslot: string[];
}

const TimeSlotInsertion: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([{ eventDate: '', timeslot: '' }]);
  const [slots, setSlots] = useState<Slots[]>([]);

  const handleAddRow = () => {
    setRows([...rows, { eventDate: '', timeslot: '' }]);
  };

  const handleDeleteRow = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Row
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = event.target.value;
    setRows(updatedRows);
  };

  const addSlot = (index: number) => {
    const updatedSlots = [...slots];
    updatedSlots[index];
  };
  return (
    <div className="mx-auto max-w-md p-4">
      <table className="w-full rounded-lg border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2">Event Date</th>
            <th className="px-4 py-2">Timeslot</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="py-2">
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2">
                <input
                  type="date"
                  value={row.eventDate}
                  onChange={(event) => handleChange(event, index, 'eventDate')}
                  className="w-full rounded border px-2 py-1"
                />
              </td>
              <td className="grid w-48 grid-cols-2 gap-2">
                <TimePicker className="flex" />
                <TimePicker className="flex" />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddRow}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Add Row
      </button>
    </div>
  );
};

export default TimeSlotInsertion;
