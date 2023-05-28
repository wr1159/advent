'use client';
import React, { useState } from 'react';
import Button from '@/components/Button';
import saveTemplate, { getAllTemplateIds } from '@/utils/save-template';
import { AiOutlineCheck } from 'react-icons/ai';

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

  const handleSave = async () => {
    const data = eventInfoList.map((info) => ({
      label: info.label,
      value: (
        document.querySelector(
          `input[name="${info.label.toLowerCase()}"]`
        ) as HTMLInputElement
      ).value
    }));
    // query for templateId here
    const templateId = await getAllTemplateIds(params.userId, params.eventId);
    const firstTemplateId = templateId[0];
    saveTemplate(data, params.userId, params.eventId, firstTemplateId);

    console.log('data saved', data);

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
                    className="ml-2 w-20 bg-red-500 text-white hover:bg-red-300"
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
                theme="secondary"
                size="sm"
                className="ml-2 w-20"
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
              <div className="mx-4 flex items-center text-emerald-500">
                {/* react icon  of check box down here with react-icon library */}
                <AiOutlineCheck className="mr-2" />
                Saved!
              </div>
            )}
            <Button
              theme="primary"
              text="Save"
              onClick={handleSave}
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
