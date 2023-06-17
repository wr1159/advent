'use client';
import React, { useEffect, useState } from 'react';
import saveTemplate, { getAllTemplateIds } from '@/utils/save-template';
import WYSIWYGContainer from '@/components/Editor/WYSIWYGContainer';
import EditorRightColumn from '@/components/Editor/EditorRightColumn';
import queryForTemplate from '@/utils/queryTemplate';

interface PageProps {
  userId: string;
  eventId: string;
}

export default function Template({ params }: { params: PageProps }) {
  const [data, setData] = useState<Record<string, string>>({});
  const [backgroundColor, setBackgroundColor] = useState<string>('');
  const [textColor, setTextColor] = useState<string>('');
  const [htmlState, setHTMLState] = useState<string>('');
  const [deltaState, setDeltaState] = useState<any>({});
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const handleWYSIWYGChange = (content: string, delta: any) => {
    setHTMLState(content);
    setDeltaState(delta);
  };
  console.log('htmlState', htmlState);
  console.log('deltaState', deltaState);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const templateData = await queryForTemplate(
          params.userId,
          params.eventId
        );
        if (templateData) {
          console.log(templateData);
          setData(templateData);
          setHTMLState(templateData.htmlContent);
        }
      } catch (error) {
        console.error('Error querying for events:', error);
      }
    };
    fetchTemplate();
  }, []);

  const handleSave = async () => {
    const templateId = await getAllTemplateIds(params.userId, params.eventId);
    const firstTemplateId = templateId[0];
    const data = {
      htmlState: htmlState,
      deltaState: JSON.stringify(deltaState),
      backgroundColor: backgroundColor,
      textColor: textColor
    };
    saveTemplate(data, params.userId, params.eventId, firstTemplateId);

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
        backgroundColor={data.backgroundColor || '#000000'}
        textColor={data.textColor || '#ffffff'}
        setBackgroundColor={setBackgroundColor}
        setTextColor={setTextColor}
      />
    </div>
  );
}
