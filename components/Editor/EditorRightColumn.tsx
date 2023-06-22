import { AiOutlineCheck } from 'react-icons/ai';
import Button from '../Button';
import { useState } from 'react';
type EditorRightColumnProps = {
  handleSave: () => Promise<void>;
  showSavedMessage: boolean;
  userId: string;
  eventId: string;
  backgroundColor: string;
  textColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
};

const EditorRightColumn: React.FC<EditorRightColumnProps> = ({
  handleSave,
  showSavedMessage,
  userId,
  eventId,
  backgroundColor,
  textColor,
  setBackgroundColor,
  setTextColor
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
    <div className="flex h-screen w-[300px] flex-col border-l border-gray-200 bg-white">
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
          <span className="text-sm font-semibold">Colour</span>
          {/* <ChevronDownIcon className="h-5 w-5 rotate-90 stroke-current text-gray-400 transition-transform group-open:rotate-0" /> */}
        </summary>
        <div className="grid grid-cols-2 gap-2 p-2 text-sm">
          <div className="rounded-md border bg-background p-2">
            <h2 className="font-bold text-gray-700">Background</h2>
            <input
              type="color"
              name="backgroundColor"
              placeholder={backgroundColor}
              className="my-2 w-full appearance-none rounded-md border-none"
              onChange={(event) => {
                setBackgroundColor(event.target.value);
              }}
              value={backgroundColor}
            />
          </div>
          <div className="rounded-md border bg-background p-2">
            <h2 className="font-bold text-gray-700">Text</h2>
            <input
              type="color"
              name="textColor"
              className="my-2 w-full appearance-none rounded-md border-none"
              onChange={(event) => {
                setTextColor(event.target.value);
              }}
              value={textColor}
            />
          </div>
        </div>
      </details>
      <details>
        <summary className="flex cursor-pointer list-none items-center justify-between border-b border-gray-200 px-6 py-4">
          <span className="text-sm font-semibold">Navigation</span>
          {/* <ChevronDownIcon className="h-5 w-5 rotate-90 stroke-current text-gray-400 transition-transform group-open:rotate-0" /> */}
        </summary>
        <div className="border-b border-gray-200 px-6 py-4">Demo</div>
      </details>

      <details>
        <summary className="flex cursor-pointer list-none items-center justify-between border-b border-gray-200 px-6 py-4">
          <span className="text-sm font-semibold">Image</span>
          {/* <ChevronDownIcon className="h-5 w-5 rotate-90 stroke-current text-gray-400 transition-transform group-open:rotate-0" /> */}
        </summary>
        <div className="border-b border-gray-200 px-6 py-4">Demo</div>
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
