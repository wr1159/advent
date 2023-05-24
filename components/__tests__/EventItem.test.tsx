import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EventItem } from '../EventItem';

describe('EventItem', () => {
  const mockEvent = {
    id: '123',
    title: 'Test Event',
    description: 'This is a test event',
    date: '2023-05-20'
  };

  it('renders event title and date', () => {
    render(<EventItem event={mockEvent} />, { wrapper: MemoryRouter });

    const titleElement = screen.getByRole('link', { name: mockEvent.title });
    const dateElement = screen.getByText(mockEvent.date);

    expect(titleElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
  });

  it('renders event link with correct href', () => {
    render(<EventItem event={mockEvent} />, { wrapper: MemoryRouter });

    const linkElement = screen.getByRole('link', { name: mockEvent.title });

    expect(linkElement).toHaveAttribute('href', `/editor/${mockEvent.id}`);
  });
});
