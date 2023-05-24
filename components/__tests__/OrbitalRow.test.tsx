import { render, screen } from '@testing-library/react';
import OrbitalRow from '../OrbitalRow';

describe('OrbitalRow', () => {
  const mockLinkCards = [
    {
      href: '/example1',
      title: 'Example 1',
      body: 'This is example 1.',
      icon: <svg>Mock Icon 1</svg>
    },
    {
      href: '/example2',
      title: 'Example 2',
      body: 'This is example 2.',
      icon: <svg>Mock Icon 2</svg>
    },
    {
      href: '/example3',
      title: 'Example 3',
      body: 'This is example 3.',
      icon: <svg>Mock Icon 3</svg>
    }
  ];

  it('renders correct number of LinkCards', () => {
    render(<OrbitalRow linkCards={mockLinkCards} />);

    const linkCardElements = screen.getAllByRole('link');

    expect(linkCardElements).toHaveLength(mockLinkCards.length);
  });

  it('renders LinkCards with correct props', () => {
    render(<OrbitalRow linkCards={mockLinkCards} />);

    const linkCardElements = screen.getAllByRole('link');

    linkCardElements.forEach((linkCardElement, index) => {
      const { href, title, body } = mockLinkCards[index];

      expect(linkCardElement).toHaveAttribute('href', href);
      expect(linkCardElement).toHaveTextContent(title);
      expect(linkCardElement).toHaveTextContent(body);
    });
  });
});
