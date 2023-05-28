'use client';
import React, { useState } from 'react';
import Button from '@/components/Button';
import saveTemplate, {
  TemplateInterface,
  StyledText
} from '@/utils/save-template';

interface EventInfo {
  id: number;
  label: string;
  type: string;
  placeholder: string;
}

interface PageProps {
  userId: string;
  eventId: string;
}

export default function Template({ params }: { params: PageProps }) {
  const [eventInfoList, setEventInfoList] = useState<EventInfo[]>([
    {
      id: 1,
      label: 'Title',
      type: 'text',
      placeholder: 'Coolest Event Ever'
    },
    {
      id: 2,
      label: 'Description',
      type: 'text',
      placeholder: 'Enter the event description'
    },
    {
      id: 3,
      label: 'Date',
      type: 'date',
      placeholder: 'Enter the event date'
    },
    {
      id: 4,
      label: 'Location',
      type: 'text',
      placeholder: 'Enter the event location'
    }
  ]);
  console.log(eventInfoList.length);
  const [newEventLabel, setNewEventLabel] = useState('');
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const handleAddEventInfo = () => {
    if (newEventLabel.trim() === '') {
      return;
    }

    const newEventInfo: EventInfo = {
      id: eventInfoList.length + 1,
      label: newEventLabel,
      type: 'text',
      placeholder: ''
    };

    setEventInfoList([...eventInfoList, newEventInfo]);
    setNewEventLabel('');
  };

  const handleSave = () => {
    const data = eventInfoList.map((info) => ({
      // info.label,
      // attribute: jsonToArray(info.json)
    }));
    // query for templateId here
    // saveTemplate(data, params.userId, params.eventId,)

    console.log(eventInfoList[0]);

    setShowSavedMessage(true);
    // Insert save logic here

    // Clear the saved message after 3 seconds
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };

  const handleDeleteEventInfo = (id: number) => {
    setEventInfoList(eventInfoList.filter((eventInfo) => eventInfo.id !== id));
  };

  return (
    <div className="p-8">
      <div className="mx-auto max-w-md rounded bg-white p-6">
        <h2 className="mb-6 text-2xl font-bold">Event Information:</h2>
        <div>
          {eventInfoList.map((eventInfo) => (
            <div key={eventInfo.id} className="mb-4">
              <label className="mb-2 block font-bold text-gray-700">
                {eventInfo.label}:
              </label>
              <div className="flex">
                <input
                  type={eventInfo.type}
                  name={eventInfo.label.toLowerCase()}
                  placeholder={eventInfo.placeholder}
                  className="w-full rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                />
                {eventInfo.id > 4 && ( // Render delete button for newly added events
                  <Button
                    text="Delete"
                    size="sm"
                    className="ml-2 bg-red-500 text-white"
                    onClick={() => handleDeleteEventInfo(eventInfo.id)}
                  />
                  // <button
                  //   type="button"
                  //   onClick={() => handleDeleteEventInfo(eventInfo.id)}
                  //   className="ml-2 rounded-lg bg-red-500 px-2 py-1 font-semibold text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                  // >
                  //   Delete
                  // </button>
                )}
              </div>
            </div>
          ))}

          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              New Event Info Label:
            </label>
            <div className="flex">
              <input
                type="text"
                value={newEventLabel}
                onChange={(e) => setNewEventLabel(e.target.value)}
                placeholder="Enter the label for new event information"
                className="w-full rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
              />
              <Button
                text="Add"
                type="secondary"
                size="sm"
                className="ml-2"
                onClick={handleAddEventInfo}
              />
              {/* <button
                type="button"
                onClick={handleAddEventInfo}
                className="ml-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Add
              </button> */}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            {showSavedMessage && (
              <div className="mx-4 flex items-center text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3a1 1 0 011 1v2.586l2.707-2.707a1 1 0 011.414 1.414L11 8.414V11a1 1 0 11-2 0V8.414L6.293 6.707A1 1 0 017.707 5.293L10 7.586V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4 10a8 8 0 1116 0 8 8 0 01-16 0zm8-7a7 7 0 100 14 7 7 0 000-14z"
                    clipRule="evenodd"
                  />
                </svg>
                Saved!
              </div>
            )}
            <Button type="primary" text="Save" onClick={handleSave} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
}
