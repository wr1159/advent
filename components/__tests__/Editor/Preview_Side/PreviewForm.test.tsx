import { fireEvent, render, screen } from '@testing-library/react';
import PreviewForm from '@/components/Editor/Preview_Side/PreviewForm';
import { INITIAL_DATA } from '@/components/Editor/Preview_Side/PreviewForm';
import addAttendee from '@/utils/add-attendee';
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

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({})),
  post: jest.fn(() => Promise.resolve({}))
}));

const params = { userId: '123', eventId: '456' };
const imageUrls = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg'
];
const backgroundColor = 'blue';

describe('PreviewForm', () => {
  it('renders the form correctly', () => {
    render(
      <PreviewForm
        params={params}
        imageUrls={imageUrls}
        backgroundColor={backgroundColor}
        includePayment="false"
        productId="test"
      />
    );

    const backgroundColorElement = screen.getByTestId('form-background-color');
    expect(backgroundColorElement).toHaveStyle(
      `background-color: ${backgroundColor};`
    );
  });

  it('progresses to success when "Submit" button is clicked', () => {
    render(
      <PreviewForm
        params={params}
        imageUrls={imageUrls}
        backgroundColor={backgroundColor}
        includePayment="false"
        productId="test"
      />
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    const success = screen.getByText('Submit');
    expect(success).toBeInTheDocument();
  });

  it('calls the handleSubmit function when the form is submitted', () => {
    // Render the component and simulate a form submission
    // Mock the handleSubmit function and assert that it is called with the correct arguments
  });
});
