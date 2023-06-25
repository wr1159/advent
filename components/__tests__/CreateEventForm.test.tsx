import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateEventForm from '@/components/CreateEventForm';
import { addDoc } from 'firebase/firestore';

jest.mock('next/navigation', () => ({
  //useRouter: jest.fn(),
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    };
  }
}));

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  CollectionReference: jest.fn(),
  DocumentReference: jest.fn(),
  getFirestore: jest.fn()
}));

describe('CreateEventForm', () => {
  it('renders Create Event form correctly', () => {
    render(<CreateEventForm uid="user123" />);

    expect(screen.getByText(/Create Event/i)).toBeInTheDocument();
  });

  it('handles event name change', () => {
    render(<CreateEventForm uid="user123" />);
    fireEvent.click(screen.getByText('Create Event'));

    const eventNameInput = screen.getByTestId(
      'event-name-input'
    ) as HTMLInputElement;
    fireEvent.change(eventNameInput, { target: { value: 'New Event' } });

    expect(eventNameInput.value).toBe('New Event');
  });

  it('submits the form correctly', async () => {
    const mockAddDoc = addDoc as jest.Mock;

    mockAddDoc.mockResolvedValueOnce({ id: 'event123' });

    render(<CreateEventForm uid="user123" />);
    fireEvent.click(screen.getByText('Create Event'));

    const eventNameInput = screen.getByTestId(
      'event-name-input'
    ) as HTMLInputElement;
    fireEvent.change(eventNameInput, { target: { value: 'New Event' } });

    const createButton = screen.getByRole('button', { name: /Create/i });
    act(() => fireEvent.click(createButton));

    expect(mockAddDoc).toHaveBeenCalled(); // Assert if addDoc is called
  });
});
