import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero', () => {
  const mockLargeText = 'Welcome to My App';

  it('renders large text correctly', () => {
    render(<Hero largeText={mockLargeText}>Some content</Hero>);

    const largeTextElement = screen.getByText(mockLargeText);

    expect(largeTextElement).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Hero largeText={mockLargeText}>Some content</Hero>);

    const childrenElement = screen.getByText('Some content');

    expect(childrenElement).toBeInTheDocument();
  });
});
