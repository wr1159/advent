'use client';
import React, { useState } from 'react';
import saveTemplate, { getAllTemplateIds } from '@/utils/save-template';
import WYSIWYGContainer from '@/components/Editor/WYSIWYGContainer';
import EditorRightColumn from '@/components/Editor/EditorRightColumn';

interface PageProps {
  userId: string;
  eventId: string;
}

export default function Template({ params }: { params: PageProps }) {
  const [htmlState, setHTMLState] = useState<string>('');
  const [deltaState, setDeltaState] = useState<any>({});
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const handleWYSIWYGChange = (content: string, delta: any) => {
    setHTMLState(content);
    setDeltaState(delta);
  };
  console.log('htmlState', htmlState);
  console.log('deltaState', deltaState);

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
