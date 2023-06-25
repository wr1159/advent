import {
  fireEvent,
  render,
  screen,
  act,
  waitFor
} from '@testing-library/react';
import EditorRightColumn from '@/components/Editor/Editor_Side/EditorRightColumn';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebaseconfig';

const handleSaveMock = jest.fn();
const handleSetBgColorMock = jest.fn();
const handleSetTextColorMock = jest.fn();
const handleSetImageUploadMock = jest.fn();
const handleSetImageUrlsMock = jest.fn();
const handleSetShowEditorMock = jest.fn();

beforeAll(() => {
  initializeApp(firebaseConfig);
});
describe('EditorRightColumn', () => {
  it('calls handleSave when "Save" button is clicked', () => {
    render(
      <EditorRightColumn
        handleSave={handleSaveMock}
        showSavedMessage={false}
        userId={''}
        eventId={''}
        backgroundColor={''}
        textColor={''}
        setBackgroundColor={handleSetBgColorMock}
        setTextColor={handleSetTextColorMock}
        imageUpload={
          new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' })
        }
        setImageUpload={handleSetImageUploadMock}
        imageUrls={[]}
        setImageUrls={handleSetImageUrlsMock}
        showEditor={false}
        setShowEditor={handleSetShowEditorMock}
      />
    );

    fireEvent.click(screen.getByText('Save'));

    expect(handleSaveMock).toHaveBeenCalled();
  });

  it('updates background color state when input changes', () => {
    render(
      <EditorRightColumn
        handleSave={handleSaveMock}
        showSavedMessage={false}
        userId={''}
        eventId={''}
        backgroundColor={''}
        textColor={''}
        setBackgroundColor={handleSetBgColorMock}
        setTextColor={handleSetTextColorMock}
        imageUpload={
          new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' })
        }
        setImageUpload={handleSetImageUploadMock}
        imageUrls={[]}
        setImageUrls={handleSetImageUrlsMock}
        showEditor={false}
        setShowEditor={handleSetShowEditorMock}
      />
    );

    const backgroundColorInput = screen.queryByTestId(
      'background-color-input'
    ) as HTMLInputElement;

    fireEvent.change(backgroundColorInput, { target: { value: '#ff0000' } });

    expect(handleSetBgColorMock).toHaveBeenCalledWith('#ff0000');
  });
  it('updates text color state when input changes', () => {
    render(
      <EditorRightColumn
        handleSave={handleSaveMock}
        showSavedMessage={false}
        userId={''}
        eventId={''}
        backgroundColor={''}
        textColor={''}
        setBackgroundColor={handleSetBgColorMock}
        setTextColor={handleSetTextColorMock}
        imageUpload={
          new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' })
        }
        setImageUpload={handleSetImageUploadMock}
        imageUrls={[]}
        setImageUrls={handleSetImageUrlsMock}
        showEditor={false}
        setShowEditor={handleSetShowEditorMock}
      />
    );

    const textColorInput = screen.queryByTestId(
      'text-color-input'
    ) as HTMLInputElement;

    fireEvent.change(textColorInput, { target: { value: '#ff0000' } });

    expect(handleSetTextColorMock).toHaveBeenCalledWith('#ff0000');
  });

  it('renders "View Event Landing Page" button with correct href attribute', () => {
    render(
      <EditorRightColumn
        handleSave={handleSaveMock}
        showSavedMessage={false}
        userId={'123'}
        eventId={'456'}
        backgroundColor={''}
        textColor={''}
        setBackgroundColor={handleSetBgColorMock}
        setTextColor={handleSetTextColorMock}
        imageUpload={
          new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' })
        }
        setImageUpload={handleSetImageUploadMock}
        imageUrls={[]}
        setImageUrls={handleSetImageUrlsMock}
        showEditor={false}
        setShowEditor={handleSetShowEditorMock}
      />
    );
    const viewPageButton = screen.getByText('View Event Landing Page');

    expect(viewPageButton.getAttribute('href')).toBe(`/event/${123}/${456}`);
  });

  it('should copy the iframe to the clipboard when "Copy Iframe" button is clicked', async () => {
    const writeTextMock = jest.fn(() => Promise.resolve());
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    render(
      <EditorRightColumn
        handleSave={handleSaveMock}
        showSavedMessage={false}
        userId={'123'}
        eventId={'456'}
        backgroundColor={''}
        textColor={''}
        setBackgroundColor={handleSetBgColorMock}
        setTextColor={handleSetTextColorMock}
        imageUpload={
          new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' })
        }
        setImageUpload={handleSetImageUploadMock}
        imageUrls={[]}
        setImageUrls={handleSetImageUrlsMock}
        showEditor={false}
        setShowEditor={handleSetShowEditorMock}
      />
    );

    const copyButton = screen.getByText('Copy Iframe');
    await act(async () => {
      fireEvent.click(copyButton);
    });

    const iframeSrc = `https://advent-beta.vercel.app/event/123/456`;
    const expectedIframe = `<iframe src="${iframeSrc}" frameborder="0" width="100%" style="height: 100vh"></iframe>`;
    expect(writeTextMock).toHaveBeenCalledWith(expectedIframe);
  });
  it('toggles showEditor state to true when the next arrow button is clicked', () => {
    // Render the component
    render(
      <EditorRightColumn
        handleSave={handleSaveMock}
        showSavedMessage={false}
        userId={'123'}
        eventId={'456'}
        backgroundColor={''}
        textColor={''}
        setBackgroundColor={handleSetBgColorMock}
        setTextColor={handleSetTextColorMock}
        imageUpload={
          new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' })
        }
        setImageUpload={handleSetImageUploadMock}
        imageUrls={[]}
        setImageUrls={handleSetImageUrlsMock}
        showEditor={false}
        setShowEditor={handleSetShowEditorMock}
      />
    );

    const nextButton = screen.queryByTestId('next-button') as HTMLButtonElement;

    fireEvent.click(nextButton);
    expect(screen.getByText('Edit Registration Form')).toBeInTheDocument();
  });

  it('toggles showEditor state back to false when the back arrow button is clicked', async () => {
    render(
      <EditorRightColumn
        handleSave={handleSaveMock}
        showSavedMessage={false}
        userId={'123'}
        eventId={'456'}
        backgroundColor={''}
        textColor={''}
        setBackgroundColor={handleSetBgColorMock}
        setTextColor={handleSetTextColorMock}
        imageUpload={
          new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' })
        }
        setImageUpload={handleSetImageUploadMock}
        imageUrls={[]}
        setImageUrls={handleSetImageUrlsMock}
        showEditor={true}
        setShowEditor={handleSetShowEditorMock}
      />
    );

    const backButton = screen.queryByTestId('back-button') as HTMLButtonElement;
    fireEvent.click(backButton);
    expect(screen.getByText('Edit Landing Page')).toBeInTheDocument();
  });
});
