import { render, screen } from '@testing-library/react';
import LinkCard from '../LinkCard';

describe('LinkCard', () => {
  const mockProps = {
    href: '/example',
    title: 'Example Card',
    body: 'This is an example card.',
    icon: <svg>Mock Icon</svg>
  };

  it('renders link with correct href', () => {
    render(<LinkCard {...mockProps} />);

    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveAttribute('href', mockProps.href);
  });

  it('renders title and body correctly', () => {
    render(<LinkCard {...mockProps} />);

    const titleElement = screen.getByText(mockProps.title);
    const bodyElement = screen.getByText(mockProps.body);

    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
  });

  it('renders icon correctly', () => {
    render(<LinkCard {...mockProps} />);

    const iconElement = screen.getByText(/Mock Icon/i);

    expect(iconElement).toBeInTheDocument();
  });
});
