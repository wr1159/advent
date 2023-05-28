import { render, screen, fireEvent } from '@testing-library/react';
import MobileNav from '../MobileNav';

describe('MobileNav', () => {
  const mockProps = {
    texts: ['Home', 'About', 'Contact'],
    links: ['/', '/about', '/contact'],
    login: true,
    showMobileMenu: true,
    setShowMobileMenu: jest.fn()
  };

  it('renders correct number of navigation items', () => {
    render(<MobileNav {...mockProps} />);

    const navigationItems = screen.getAllByRole('link');

    expect(navigationItems.length).toEqual(mockProps.links.length + 1);
  });

  it('calls setShowMobileMenu when close button is clicked', () => {
    render(<MobileNav {...mockProps} />);

    const closeButton = screen.getByRole('button');

    fireEvent.click(closeButton);

    expect(mockProps.setShowMobileMenu).toHaveBeenCalledTimes(1);
    expect(mockProps.setShowMobileMenu).toHaveBeenCalledWith(false);
  });
});
