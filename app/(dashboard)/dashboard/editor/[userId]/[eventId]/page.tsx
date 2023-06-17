'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import saveTemplate, { getAllTemplateIds } from '@/utils/save-template';
import { AiOutlineCheck } from 'react-icons/ai';
import queryForTemplate from '@/utils/queryTemplate';
import WYSIWYGContainer from '@/components/Editor/WYSIWYGContainer';
import EditorRightColumn from '@/components/Editor/EditorRightColumn';

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

  const [htmlState, setHTMLState] = useState<string>('');
  const [deltaState, setDeltaState] = useState<any>({});
  const handleWYSIWYGChange = (content: string, delta: any) => {
    setHTMLState(content);
    setDeltaState(delta);
  };
  console.log(eventInfoList.length);
  console.log('htmlState', htmlState);
  console.log('deltaState', deltaState);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const handleSave = async () => {
    const templateId = await getAllTemplateIds(params.userId, params.eventId);
    const firstTemplateId = templateId[0];
    saveTemplate(
      htmlState,
      deltaState,
      params.userId,
      params.eventId,
      firstTemplateId
    );

    setShowSavedMessage(true);
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
        <div className="p-4">
          <WYSIWYGContainer
            content={htmlState}
            handleChange={handleWYSIWYGChange}
          />
        </div>
      </div>
      <EditorRightColumn
        handleSave={handleSave}
        showSavedMessage={showSavedMessage}
        userId={params.userId}
        eventId={params.eventId}
      />
    </div>
  );
}
