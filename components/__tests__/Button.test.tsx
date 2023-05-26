import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders button with text', () => {
    const buttonText = 'Click me';
    render(<Button text={buttonText} />);

    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies custom class', () => {
    const buttonText = 'Click me';
    const customClass = 'custom-class';
    render(<Button text={buttonText} className={customClass} />);

    const buttonElement = screen.getByRole('button', { name: buttonText });
    expect(buttonElement).toHaveClass(customClass);
  });

  it('triggers onClick event', () => {
    const buttonText = 'Click me';
    const handleClick = jest.fn();
    render(<Button text={buttonText} onClick={handleClick} />);

    const buttonElement = screen.getByRole('button', { name: buttonText });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
