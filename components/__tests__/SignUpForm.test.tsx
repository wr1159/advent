import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUpForm from '@/components/SignUpForm';

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
    render(<SignUpForm />);

    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByTestId('password-signup')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword-signup')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign up/i })
    ).toBeInTheDocument();
  });
  it('allows typing in email and password fields', () => {
    render(<SignUpForm />);

    const emailInput = screen.getByTestId('email-signup') as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      'password-signup'
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      'confirmPassword-signup'
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' }
    });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });
});
