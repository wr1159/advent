import React from 'react';
import { getAllByRole, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AttendeeTable from '../Attendee/AttendeeTable';

describe('AttendeeTable', () => {
  const mockAttendees = [
    {
      submitTime: '2023-07-20T10:00:00Z',
      name: 'John Doe',
      email: 'john@example.com',
      birthday: '1990-01-01'
    },
    {
      submitTime: '2023-07-21T15:30:00Z',
      name: 'Jane Smith',
      email: 'jane@example.com',
      birthday: '1985-05-15'
    }
  ];

  test('renders table with correct headers and data', () => {
    const { getByRole, getAllByRole } = render(
      <AttendeeTable attendees={mockAttendees} />
    );

    // Check if the table headers are rendered correctly
    const tableHeaderRow = getByRole('row', {
      name: 'SubmitTime Name Email Birthday'
    });
    expect(tableHeaderRow).toBeInTheDocument();

    const tableRows = getAllByRole('row');
    expect(tableRows).toHaveLength(mockAttendees.length + 1); // +1 for the header row

    const tableCells = getAllByRole('cell');
    expect(tableCells).toHaveLength(8); // Adjust the count based on your actual column count and number of attendees
  });
});
