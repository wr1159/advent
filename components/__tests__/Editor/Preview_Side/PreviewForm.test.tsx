import { fireEvent, render, screen } from '@testing-library/react';
import PreviewForm from '@/components/Editor/Preview_Side/PreviewForm';
import { INITIAL_DATA } from '@/components/Editor/Preview_Side/PreviewForm';
import addAttendee from '@/utils/addAttendee';

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
      />
    );

    const backgroundColorElement = screen.getByTestId('form-background-color');
    expect(backgroundColorElement).toHaveStyle(
      `background-color: ${backgroundColor};`
    );
    // Add your assertions here to verify the correct rendering of the form components
  });

  it('updates the data correctly', () => {
    // Render the component and perform actions to update the data
    // Use the `updateFields` prop to trigger the data update
    // Assert that the data is updated correctly by accessing the form components and checking their values
  });

  it('progresses to the next step when "Next" button is clicked', () => {
    render(
      <PreviewForm
        params={params}
        imageUrls={imageUrls}
        backgroundColor={backgroundColor}
      />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    const nextStep = screen.getByText('Demo');
    expect(nextStep).toBeInTheDocument();
  });

  it('goes back to the previous step when "Back" button is clicked', () => {
    render(
      <PreviewForm
        params={params}
        imageUrls={imageUrls}
        backgroundColor={backgroundColor}
      />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    const prevStep = screen.getByText('Attendee Details');
    expect(prevStep).toBeInTheDocument();
  });

  it('submits the form when "Submit" button is clicked and it\'s the last step', () => {
    render(
      <PreviewForm
        params={params}
        imageUrls={imageUrls}
        backgroundColor={backgroundColor}
      />
    );

    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Back'));
  });

  it('calls the handleSubmit function when the form is submitted', () => {
    // Render the component and simulate a form submission
    // Mock the handleSubmit function and assert that it is called with the correct arguments
  });
});
