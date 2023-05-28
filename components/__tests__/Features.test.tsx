import { render, screen } from '@testing-library/react';
import FeaturesComponent from '../Features';

describe('FeaturesComponent', () => {
  it('renders heading with correct text', () => {
    render(<FeaturesComponent />);

    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveTextContent('Features');
  });
});
