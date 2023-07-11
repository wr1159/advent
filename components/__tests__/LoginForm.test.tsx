import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '@/components/LoginForm';

jest.mock('next/navigation', () => ({
  //useRouter: jest.fn(),
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    };
  }
}));

describe('LoginForm', () => {
  it('renders login form correctly', () => {
    render(<LoginForm />);

    expect(screen.getByTestId('email-login')).toBeInTheDocument();
    expect(screen.getByTestId('password-login')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });
  it('allows typing in email and password fields', () => {
    render(<LoginForm />);

    const emailInput = screen.getByTestId('email-login') as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      'password-login'
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
  /*
  it('handles form submission successfully', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: 'abcd@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456789' } });

    fireEvent.click(signInButton);
    // Assert if router.push is called with the correct route
  });
  */
});
