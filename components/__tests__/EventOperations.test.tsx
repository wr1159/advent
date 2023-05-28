import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventOperations } from '../EventOperations';

describe('EventOperations', () => {
  const mockEvent = {
    id: '123',
    title: 'Test Event'
  };

  it('renders menu button', () => {
    render(<EventOperations event={mockEvent} />);

    const menuButtonElement = screen.getByRole('button', { name: 'Open' });

    expect(menuButtonElement).toBeInTheDocument();
  });
});
