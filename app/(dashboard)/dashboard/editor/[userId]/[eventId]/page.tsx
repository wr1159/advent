'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import saveTemplate, { getAllTemplateIds } from '@/utils/save-template';
import queryForTemplate from '@/utils/queryTemplate';
import EditorRightColumn from '@/components/Editor/Editor_Side/EditorRightColumn';

interface AttendeeInfo {
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
  // This data is the previously saved template.
  const [attendeeInfoList, setAttendeeInfoList] = useState<AttendeeInfo[]>([]);

  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  const handleBgColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(event.target.value);
  };

  const handleTextColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextColor(event.target.value);
  };

  const capitalizeFirstLetter = (str: string): string =>
    `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

  let defaultList: AttendeeInfo[] = [];

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        console.log('trying to queryForTemplate');
        console.log(
          'userID: ' + params.userId + ' ;eventID: ' + params.eventId
        );
        const templateData = await queryForTemplate(
          params.userId,
          params.eventId
        );

        // if there is templateData and event_id isnt the only key in that templateData
        if (templateData && Object.keys(templateData)[0] != 'event_id') {
          console.log('templateData', templateData);
          // Rendering main form
          let i = 0;
          defaultList = Object.entries(templateData)
            .filter(
              ([key, value]) =>
                key !== 'event_id' && key !== 'bgColor' && key !== 'textColor'
            )
            .map(([key, value], index) => ({
              id:
                key === 'name'
                  ? 0
                  : key === 'email'
                  ? 1
                  : key === 'birthday'
                  ? 2
                  : 3 + i++,
              label: capitalizeFirstLetter(key),
              accessKey: key,
              type: key === 'birthday' ? 'date' : 'text',
              placeholder: 'Enter your ' + key
            }))
            .sort((a, b) => a.id - b.id);

          // Rendering colors
          console.log(templateData['bgColor']);
          setBgColor(templateData['bgColor']);
          setTextColor(templateData['textColor']);
        } else {
          defaultList = [
            {
              id: 0,
              label: 'Name',
              accessKey: 'name',
              type: 'text',
              placeholder: 'Enter your name'
            },
            {
              id: 1,
              label: 'Email',
              accessKey: 'email',
              type: 'email',
              placeholder: 'Enter your email'
            },
            {
              id: 2,
              label: 'Date of birth',
              accessKey: 'birthday',
              type: 'date',
              placeholder: 'Enter your date of birth'
            }
          ];
        }
        setAttendeeInfoList(defaultList);
      } catch (error) {
        console.error('Error querying for attendees:', error);
      }
    };
    fetchTemplate();
  }, []);

  console.log(attendeeInfoList.length);
  const [newAttendeeLabel, setNewAttendeeLabel] = useState('');
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const handleAddAttendeeInfo = () => {
    if (newAttendeeLabel.trim() === '') {
      return;
    }

    const newAttendeeInfo: AttendeeInfo = {
      id: attendeeInfoList.length + 1,
      label: newAttendeeLabel,
      // accessorKey removes all space and converts to lowercase
      accessKey: newAttendeeLabel.replace(/\s/g, '').toLowerCase(),
      type: 'text',
      placeholder: ''
    };

    setAttendeeInfoList([...attendeeInfoList, newAttendeeInfo]);
    setNewAttendeeLabel('');
  };

  const handleSave = async () => {
    const formData = attendeeInfoList.map((info) => ({
      label: info.accessKey,
      value: (
        document.querySelector(
          `input[name="${info.label.toLowerCase()}"]`
        ) as HTMLInputElement
      ).value
    }));

    const bgColorData = { label: 'bgColor', value: bgColor };
    const textColorData = { label: 'textColor', value: textColor };

    const data = formData.concat(bgColorData, textColorData);
    // query for templateId here
    const templateId = await getAllTemplateIds(params.userId, params.eventId);
    const firstTemplateId = templateId[0];
    saveTemplate(data, params.userId, params.eventId, firstTemplateId);

    console.log('data saved', data);

    setShowSavedMessage(true);

    // Clear the saved message after 3 seconds
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };

  const handleDeleteAttendeeInfo = (id: number) => {
    setAttendeeInfoList(
      attendeeInfoList.filter((attendeeInfo) => attendeeInfo.id !== id)
    );
  };

  return (
    <div className="bg gray-100 flex">
      <div className="flex flex-1 flex-col border">
        {/* Left section here */}
        <div className="p-8">
          <div className="mx-auto max-w-md rounded bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold">Attendee Form:</h2>

            <div className="my-4 rounded-md border bg-background p-4 ">
              {attendeeInfoList
                .filter((attendeeInfo) => attendeeInfo.type !== 'color')
                .map((attendeeInfo) => (
                  <div key={attendeeInfo.id} className="mb-4">
                    <label className="mb-2 block font-bold text-gray-700">
                      {attendeeInfo.label}:
                    </label>
                    <div className="flex">
                      <input
                        type={attendeeInfo.type}
                        name={attendeeInfo.label.toLowerCase()}
                        placeholder={attendeeInfo.placeholder}
                        className="w-full rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
                        readOnly
                      />
                      {attendeeInfo.id > 2 && ( // Render delete button for newly added attendees
                        <Button
                          text="Delete"
                          size="sm"
                          className="ml-2 w-20 bg-red-500 text-white hover:bg-red-300"
                          onClick={() =>
                            handleDeleteAttendeeInfo(attendeeInfo.id)
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <EditorRightColumn
        handleSave={handleSave}
        handleAddEventInfo={handleAddAttendeeInfo}
        showSavedMessage={showSavedMessage}
        newEventLabel={newAttendeeLabel}
        setNewEventLabel={setNewAttendeeLabel}
        bgColor={bgColor}
        textColor={textColor}
        handleBgColorChange={handleBgColorChange}
        handleTextColorChange={handleTextColorChange}
        userId={params.userId}
        eventId={params.eventId}
      />
    </div>
  );
}
