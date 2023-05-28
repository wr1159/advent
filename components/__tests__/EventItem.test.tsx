import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EventItem } from '../EventItem';

describe('EventItem', () => {
  const mockEvent = {
    id: '123',
    name: 'Test Event',
    date: '2023-05-20'
  };

  it('renders event title and date', () => {
    render(<EventItem uid={'1231'} event={mockEvent} />, {
      wrapper: MemoryRouter
    });

    const titleElement = screen.getByRole('link', { name: mockEvent.name });
    const dateElement = screen.getByText(mockEvent.date);

    expect(titleElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
  });

  it('renders event link with correct href', () => {
    const uid = '12312';
    render(<EventItem uid={uid} event={mockEvent} />, {
      wrapper: MemoryRouter
    });

    const linkElement = screen.getByRole('link', { name: mockEvent.name });

    expect(linkElement).toHaveAttribute(
      'href',
      `/dashboard/editor/${uid}/${mockEvent.id}`
    );
  });
});
