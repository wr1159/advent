import { AiOutlineCheck } from 'react-icons/ai';
import Button from '../Button';
type EditorRightColumnProps = {
  handleSave: () => Promise<void>;
  showSavedMessage: boolean;
  userId: string;
  eventId: string;
};

const EditorRightColumn: React.FC<EditorRightColumnProps> = ({
  handleSave,
  showSavedMessage,
  userId,
  eventId
}) => {
  return (
    <div className="flex h-screen w-[300px] flex-col border-l border-gray-200 bg-white">
      <div className="h-18 flex items-center justify-center gap-x-4 border-b border-gray-200 px-6 py-5">
        {showSavedMessage && (
          <div className="fixed right-0 top-0 m-4 flex items-center rounded-lg bg-white px-4 py-2 text-emerald-500 shadow-md">
            {/* react icon  of check box down here with react-icon library */}
            <AiOutlineCheck className="mr-2" />
            Saved!
          </div>
        )}
        <Button theme="primary" text="Save" onClick={handleSave} size="wide" />
      </div>

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
