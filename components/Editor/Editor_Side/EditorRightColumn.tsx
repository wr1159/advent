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
  includePayment: boolean;
  setIncludePayment: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
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
  setShowEditor,
  includePayment,
  setIncludePayment,
  price,
  setPrice
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

  const handleRegistrationFeeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (
      value === '' ||
      (value.match(/^\d*\.?\d{0,2}$/) && parseFloat(value) >= 0)
    ) {
      setPrice(Number(value));
    }
  };

  return (
    <div className="flex  w-[300px] flex-col border-r border-t border-gray-200 bg-white">
      <div className="flex-col space-y-4 border-b border-gray-200 py-5">
        <div className="h-18 flex items-center justify-center px-3">
          {showSavedMessage && (
            <div className="fixed right-0 top-0 m-4 flex items-center rounded-lg bg-white px-4 py-2 text-emerald-500 shadow-md">
              <AiOutlineCheck className="mr-2" />
              Saved!
            </div>
          )}
          <Button
            id="save-btn"
            className="font-sans font-normal"
            theme="primary"
            text="Save"
            onClick={handleSave}
            size="wide"
          />
        </div>
        <div className="h-18 flex items-center justify-center px-3">
          <Button
            id="copy-btn"
            className="font-sans"
            theme="secondary"
            text={isCopied ? 'Copied!' : 'Copy Iframe'}
            onClick={handleCopy}
            size="wide"
          />
        </div>
      </div>

      <details>
        <summary
          id="nav-btn"
          className="flex cursor-pointer list-none items-center justify-between border-b border-gray-200 px-6 py-4"
        >
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
      <div className="flex cursor-pointer list-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <span className="text-sm font-semibold">Payment</span>
      </div>
      <div>
        <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4">
          <label className="space-x-2">
            <input
              type="checkbox"
              checked={includePayment}
              onChange={(e) => setIncludePayment(e.target.checked)}
            />
            <span className="text-sm font-semibold text-gray-700">
              Include payment page
            </span>
          </label>
        </summary>

        {includePayment && (
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-semibold text-gray-700">
                Registration Fee: (SGD)
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={price.toFixed(2)}
                  onChange={handleRegistrationFeeChange}
                  placeholder="Enter registration fee"
                  className="w-24 rounded-md border py-1 pl-6"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="flex cursor-pointer list-none items-center justify-between border-b border-t border-gray-200 px-6 py-4">
          <span className="text-sm font-semibold  ">Layout Editor</span>
        </div>

        <div id="color-picker" className="grid grid-cols-2 gap-2 p-2 text-sm">
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
      </div>

      <div
        id="view-btn"
        className="h-18 flex items-center justify-center gap-x-4 border-b border-gray-200 px-6 py-5"
      >
        <Button
          className="items font-sans"
          text="View event page"
          href={`/event/${userId}/${eventId}`}
          theme="secondary"
        />
      </div>
    </div>
  );
};

export default EditorRightColumn;
