import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCheck
} from 'react-icons/ai';
import Button from '../../Button';
import { useState } from 'react';
import ImageUpload from './ImageUpload';

type EditorRightColumnProps = {
  handleSave: () => Promise<void>;
  showSavedMessage: boolean;
  userId: string;
  eventId: string;
  backgroundColor: string;
  textColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  imageUpload: File | null;
  setImageUpload: React.Dispatch<React.SetStateAction<File | null>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  showEditor: boolean;
  setShowEditor: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditorRightColumn: React.FC<EditorRightColumnProps> = ({
  handleSave,
  showSavedMessage,
  userId,
  eventId,
  backgroundColor,
  textColor,
  setBackgroundColor,
  setTextColor,
  imageUpload,
  setImageUpload,
  imageUrls,
  setImageUrls,
  showEditor,
  setShowEditor
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const iframe = `<iframe src="https://advent-beta.vercel.app/event/${userId}/${eventId}" frameborder="0" width="100%" style="height: 100vh"></iframe>`;
    navigator.clipboard
      .writeText(iframe)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Failed to copy iframe:', error);
      });
  };
  return (
    <div className="flex  w-[300px] flex-col border-l border-gray-200 bg-white">
      <div className="flex-col space-y-4 border-b border-gray-200 py-5">
        <div className="h-18 flex items-center justify-center px-3">
          {showSavedMessage && (
            <div className="fixed right-0 top-0 m-4 flex items-center rounded-lg bg-white px-4 py-2 text-emerald-500 shadow-md">
              {/* react icon  of check box down here with react-icon library */}
              <AiOutlineCheck className="mr-2" />
              Saved!
            </div>
          )}
          <Button
            theme="primary"
            text="Save"
            onClick={handleSave}
            size="wide"
          />
        </div>
        <div className="h-18 flex items-center justify-center px-3">
          <Button
            theme="secondary"
            text={isCopied ? 'Copied!' : 'Copy Iframe'}
            onClick={handleCopy}
            size="wide"
          />
        </div>
      </div>

      <details>
        <summary className="flex cursor-pointer list-none items-center justify-between border-b border-gray-200 px-6 py-4">
          {/* <span className="text-sm font-semibold">Navigation</span> */}
          {showEditor ? (
            <>
              <span
                onClick={() => setShowEditor(false)}
                className="text-sm font-semibold"
              >
                Edit Landing Page
              </span>
              <button
                className="text-gray-400 hover:text-emerald-500"
                onClick={() => {
                  console.log('BG ' + backgroundColor);
                  console.log('Text ' + textColor);
                  setShowEditor(false);
                }}
                disabled={!showEditor}
                data-testid="back-button"
              >
                <AiOutlineArrowLeft />
              </button>
            </>
          ) : (
            <>
              <span className="text-sm font-semibold">
                Edit Registration Form
              </span>
              <button
                className="text-gray-400 hover:text-emerald-500"
                onClick={() => {
                  console.log('BG ' + backgroundColor);
                  console.log('Text ' + textColor);
                  setShowEditor(true);
                }}
                disabled={showEditor}
                data-testid="next-button"
              >
                <AiOutlineArrowRight />
              </button>
            </>
          )}
        </summary>
      </details>

      <details>
        <summary className="flex cursor-pointer list-none items-center justify-between border-b border-gray-200 px-6 py-4">
          <span className="text-sm font-semibold">Layout Editor</span>
        </summary>

        <div className="grid grid-cols-2 gap-2 p-2 text-sm">
          <div className="rounded-md border bg-background p-2">
            <h2 className="text-center font-bold text-gray-700">Background</h2>
            <input
              type="color"
              name="backgroundColor"
              placeholder={backgroundColor}
              className="my-2 w-full appearance-none rounded-md border-none"
              onChange={(event) => {
                setBackgroundColor(event.target.value);
              }}
              value={backgroundColor ?? '#ffffff'}
              data-testid="background-color-input"
            />
          </div>
          <div className="rounded-md border bg-background p-2">
            <h2 className="text-center font-bold text-gray-700">Text</h2>
            <input
              type="color"
              name="textColor"
              className="my-2 w-full appearance-none rounded-md border-none"
              onChange={(event) => {
                setTextColor(event.target.value);
              }}
              value={textColor ?? '#000000'}
              data-testid="text-color-input"
            />
          </div>
        </div>

        <div className="border-b border-gray-200 px-6 py-4">
          <ImageUpload
            userId={userId}
            eventId={eventId}
            imageUpload={imageUpload}
            setImageUpload={setImageUpload}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
          />
        </div>
      </details>

      <div className="h-18 flex items-center justify-center gap-x-4 border-b border-gray-200 px-6 py-5">
        <Button
          text="View Event Landing Page"
          href={`/event/${userId}/${eventId}`}
          className="items"
          theme="secondary"
        />
      </div>
    </div>
  );
};

export default EditorRightColumn;
