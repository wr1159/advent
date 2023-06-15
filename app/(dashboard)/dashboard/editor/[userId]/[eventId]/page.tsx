'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import saveTemplate, { getAllTemplateIds } from '@/utils/save-template';
import { AiOutlineCheck } from 'react-icons/ai';
import queryForTemplate from '@/utils/queryTemplate';

interface EventInfo {
  id: number;
  label: string;
  accessKey: string;
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
      id: 0,
      label: 'Background Colour',
      accessKey: 'bgColour',
      type: 'color',
      placeholder: '#ffffff'
    },
    {
      id: 1,
      label: 'Text Colour',
      accessKey: 'textColour',
      type: 'color',
      placeholder: '#000000'
    },
    {
      id: 2,
      label: 'Title',
      accessKey: 'title',
      type: 'text',
      placeholder: 'Coolest Event Ever'
    },
    {
      id: 3,
      label: 'Description',
      accessKey: 'description',
      type: 'text',
      placeholder: 'Enter the event description'
    },
    {
      id: 4,
      label: 'Date',
      accessKey: 'date',
      type: 'date',
      placeholder: 'Enter the event date'
    },
    {
      id: 5,
      label: 'Location',
      accessKey: 'location',
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
      // accessorKey removes all space and converts to lowercase
      accessKey: newEventLabel.replace(/\s/g, '').toLowerCase(),
      type: 'text',
      placeholder: ''
    };

    setEventInfoList([...eventInfoList, newEventInfo]);
    setNewEventLabel('');
  };

  const handleSave = async () => {
    const data = eventInfoList.map((info) => ({
      label: info.accessKey,
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
    <div className="bg gray-100 flex">
      <div className="flex h-screen flex-1 flex-col border">
        {/* Left section here */}
        <div className="p-8">
          {/* <div className="flex items-center justify-center pb-8">
            <Button
              text="View Event Landing Page"
              href={`/event/${params.userId}/${params.eventId}`}
              className="items"
              theme="secondary"
            />
          </div> */}
          <div className="mx-auto max-w-md rounded bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold">Event Information:</h2>
            <div>
              <div className="grid grid-cols-2 gap-2">
                {eventInfoList
                  .filter((eventInfo) => eventInfo.type === 'color')
                  .map((eventInfo) => (
                    <div
                      className="rounded-md border bg-background p-4"
                      key={eventInfo.id}
                    >
                      <h2 className="font-bold text-gray-700">
                        {eventInfo.label}
                      </h2>
                      <input
                        type={eventInfo.type}
                        name={eventInfo.label.toLowerCase()}
                        placeholder={eventInfo.placeholder}
                        className="my-2 w-full appearance-none rounded-md border-none"
                      />
                    </div>
                  ))}
              </div>
              <div className="my-4 rounded-md border bg-background p-4 ">
                {eventInfoList
                  .filter((eventInfo) => eventInfo.type !== 'color')
                  .map((eventInfo) => (
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
                        {eventInfo.id > 6 && ( // Render delete button for newly added events
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
              </div>

              <div className="mb-4"></div>
            </div>
          </div>
        </div>
      </div>

      <aside className="flex h-screen w-[300px] flex-col border-l border-gray-200 bg-white">
        <div className="h-18 flex items-center justify-center gap-x-4 border-b border-gray-200 px-6 py-5">
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
            size="wide"
          />
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
            href={`/event/${params.userId}/${params.eventId}`}
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
      </aside>
    </div>
  );
}
