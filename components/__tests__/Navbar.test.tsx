import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar', () => {
  const mockProps = {
    texts: ['Home', 'About', 'Contact'],
    links: ['/', '/about', '/contact'],
    login: true
  };

  it('renders correct number of navigation items', () => {
    render(<Navbar {...mockProps} />);

    const navigationItems = screen.getAllByRole('link');

    expect(navigationItems.length).toEqual(mockProps.links.length + 2);
  });

  it('renders login button when login prop is true', () => {
    render(<Navbar {...mockProps} />);

    const loginButton = screen.getByRole('link', { name: 'Login' });

    expect(loginButton).toBeInTheDocument();
  });
});
