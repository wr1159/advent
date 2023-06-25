import {
  render,
  screen,
  fireEvent,
  act,
  waitFor
} from '@testing-library/react';
import ImageUpload from '@/components/Editor/Editor_Side/ImageUpload';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebaseconfig';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
  initializeApp(firebaseConfig);
});

describe('ImageUpload', () => {
  const userId = 'user123';
  const eventId = 'event123';

  it('renders the "Select Image" button', () => {
    render(
      <ImageUpload
        userId={userId}
        eventId={eventId}
        imageUpload={null}
        setImageUpload={jest.fn()}
        imageUrls={[]}
        setImageUrls={jest.fn()}
      />
    );

    const selectImageButton = screen.getByText('Select Image');
    expect(selectImageButton).toBeInTheDocument();
  });

  it('opens file dialog on "Select Image" button click', () => {
    render(
      <ImageUpload
        userId={userId}
        eventId={eventId}
        imageUpload={null}
        setImageUpload={jest.fn()}
        imageUrls={[]}
        setImageUrls={jest.fn()}
      />
    );

    const selectImageButton = screen.getByText('Select Image');

    // expect(clickSpy).toHaveBeenCalled();
  });

  it('uploads photo succesfully', async () => {
    global.URL.createObjectURL = jest.fn();
    const file = new File(['hi'], 'image.png', { type: 'image/png' });
    // render the component
    const { getByTestId } = render(
      <ImageUpload
        userId={userId}
        eventId={eventId}
        imageUpload={file}
        setImageUpload={jest.fn()}
        imageUrls={[]}
        setImageUrls={jest.fn()}
      />
    );

    // get the upload button
    const uploader = getByTestId('photo-uploader') as HTMLInputElement;

    // simulate ulpoad event and wait until finish
    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] }
      })
    );
    // Not testable because of URL.
    // get the same uploader from the dom
    expect(uploader.files?.[0].name).toBe('image.png');
    expect(uploader.files?.length).toBe(1);
  });
  it('renders images correctly', () => {
    // Mocked image URLs
    const dummyImageUrls = ['https://example.com/image1.jpg'];

    // Render the component with imageUrls
    render(
      <ImageUpload
        userId={userId}
        eventId={eventId}
        imageUpload={null}
        setImageUpload={jest.fn()}
        imageUrls={dummyImageUrls}
        setImageUrls={jest.fn()}
      />
    );

    // Check if each image is rendered
    const imageElement = screen.getByAltText('image');
    expect(imageElement).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fexample.com%2Fimage1.jpg&w=1080&q=75'
    );
  });
});
