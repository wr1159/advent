import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  it('renders card with title and body', () => {
    const title = 'Card Title';
    const body = 'Card Body';
    render(<Card title={title} body={body} />);

    const titleElement = screen.getByText(title);
    const bodyElement = screen.getByText(body);

    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
  });

  it('renders card with icon', () => {
    const title = 'Card Title';
    const body = 'Card Body';
    const icon = <svg data-testid="icon" />;
    render(<Card title={title} body={body} icon={icon} />);

    const iconElement = screen.getByTestId('icon');

    expect(iconElement).toBeInTheDocument();
  });
});
