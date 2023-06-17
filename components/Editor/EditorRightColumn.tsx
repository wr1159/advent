import { AiOutlineCheck } from 'react-icons/ai';
import Button from '../Button';
import { useState } from 'react';
import ImageUpload from './ImageUpload';

type EditorRightColumnProps = {
  handleSave: () => Promise<void>;
  handleAddEventInfo: () => void;
  showSavedMessage: boolean;
  newEventLabel: string;
  setNewEventLabel: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  eventId: string;
};

const EditorRightColumn: React.FC<EditorRightColumnProps> = ({
  handleSave,
  handleAddEventInfo,
  showSavedMessage,
  newEventLabel,
  setNewEventLabel,
  userId,
  eventId
}) => {
  return (
    // h-screen here
    <div className="flex w-[300px] flex-col border-l border-gray-200 bg-white">
      <div className="h-18 flex items-center justify-center gap-x-4 border-b border-gray-200 px-6 py-5">
        {showSavedMessage && (
          <div className="fixed right-0 top-0 m-4 flex items-center rounded-lg bg-white px-4 py-2 text-emerald-500 shadow-md">
            {/* react icon of check box down here with react-icon library */}
            <AiOutlineCheck className="mr-2" />
            Saved!
          </div>
        )}
        <Button theme="primary" text="Save" onClick={handleSave} size="wide" className='bg-green-500 text-white' />
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
        <div className="border-b border-gray-200 px-6 py-4"><ImageUpload/></div>

      </details>

      <div className="h-18 flex items-center justify-center gap-x-4 border-b border-gray-200 px-6 py-5">
        <Button
          text="View Event Landing Page"
          href={`/event/${userId}/${eventId}`}
          className="items"
          theme="secondary"
        />
      </div>
      <div className="h-18 flex items-center justify-center gap-x-4 border-b border-gray-200 px-6 py-5">
        <input
          type="text"
          value={newEventLabel}
          onChange={(e) => setNewEventLabel(e.target.value)}
          placeholder="Enter label for new event information"
          className="w-full rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        />
        <Button
          text="Add"
          theme="secondary"
          size="sm"
          className="ml-2 w-20"
          onClick={handleAddEventInfo}
        />
      </div>
    </div>
  );
};

export default EditorRightColumn;
