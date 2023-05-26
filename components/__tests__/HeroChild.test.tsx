import { render, screen } from '@testing-library/react';
import HeroChild from '../HeroChild';

describe('HeroChild', () => {
  it('renders "Get Started" button correctly', () => {
    render(<HeroChild />);

    const getStartedButtonElement = screen.getByRole('link', {
      name: 'Get Started'
    });

    expect(getStartedButtonElement).toBeInTheDocument();
  });

  it('renders "Github" button correctly', () => {
    render(<HeroChild />);

    const githubButtonElement = screen.getByRole('link', { name: 'Github' });

    expect(githubButtonElement).toBeInTheDocument();
  });
});
