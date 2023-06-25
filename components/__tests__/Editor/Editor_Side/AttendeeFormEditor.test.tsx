import {
  fireEvent,
  render,
  screen,
  act,
  waitFor
} from '@testing-library/react';
import NewAttendeeFormEditor from '@/components/Editor/Editor_Side/AttendeeFormEditor';
import { AttendeeInfo } from '@/components/Editor/Editor_Side/AttendeeFormEditor';

describe('NewAttendeeFormEditor', () => {
  it('renders the registration form correctly', () => {
    render(
      <NewAttendeeFormEditor
        params={{ userId: 'user123', eventId: 'event123' }}
        attendeeInfoList={[
          {
            id: 0,
            label: 'Name',
            accessKey: 'name',
            type: 'text',
            placeholder: 'Enter your name'
          },
          {
            id: 1,
            label: 'Email',
            accessKey: 'email',
            type: 'email',
            placeholder: 'Enter your email'
          }
        ]}
        setAttendeeInfoList={jest.fn()}
        setBackgroundColor={jest.fn()}
        setTextColor={jest.fn()}
      />
    );
    expect(screen.getByText('Registration Form:')).toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('adds a new attendee info on add button click', () => {
    const attendeeInfoList: AttendeeInfo[] = [];
    const mockSetAttendeeInfoList = jest.fn();
    render(
      <NewAttendeeFormEditor
        params={{ userId: 'user123', eventId: 'event123' }}
        attendeeInfoList={attendeeInfoList}
        setAttendeeInfoList={mockSetAttendeeInfoList}
        setBackgroundColor={jest.fn()}
        setTextColor={jest.fn()}
      />
    );

    // Enter a new attendee info label
    const newAttendeeLabelInput = screen.getByTestId('label-input');
    fireEvent.change(newAttendeeLabelInput, { target: { value: 'Age' } });

    // Click the Add button
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    // Verify the new attendee info is added
    expect(mockSetAttendeeInfoList).toHaveBeenCalledTimes(1);
    expect(mockSetAttendeeInfoList).toHaveBeenCalledWith([
      {
        id: 1,
        label: 'Age',
        accessKey: 'age',
        type: 'text',
        placeholder: ''
      }
    ]);
  });

  it('deletes attendee info on delete button click', () => {
    render(
      <NewAttendeeFormEditor
        params={{ userId: 'user123', eventId: 'event123' }}
        attendeeInfoList={[
          {
            id: 0,
            label: 'Name',
            accessKey: 'name',
            type: 'text',
            placeholder: ''
          }
        ]}
        setAttendeeInfoList={jest.fn()}
        setBackgroundColor={jest.fn()}
        setTextColor={jest.fn()}
      />
    );
    const deleteButton = screen.getByText('Delete');

    // Click the "Delete" button for the first attendee info
    fireEvent.click(deleteButton);

    // Verify that the first attendee info is deleted
    expect(screen.queryByLabelText('Name:')).not.toBeInTheDocument();
  });
});
