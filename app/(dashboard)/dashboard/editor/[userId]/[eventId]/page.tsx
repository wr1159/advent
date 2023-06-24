'use client';
import React, { useEffect, useState } from 'react';
import AttendeeFormEditor from '@/components/Editor/Editor_Side/AttendeeFormEditor';
import EditorRightColumn from '@/components/Editor/Editor_Side/EditorRightColumn';
import saveTemplate, { getAllTemplateIds } from '@/utils/save-template';
import WYSIWYGContainer from '@/components/Editor/WYSIWYGContainer';
import queryForTemplate from '@/utils/queryTemplate';
import uploadImage from '@/utils/uploadImage';

interface PageProps {
  userId: string;
  eventId: string;
}

interface AttendeeInfo {
  id: number;
  label: string;
  accessKey: string;
  type: string;
  placeholder: string;
}

export default function Template({ params }: { params: PageProps }) {
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [htmlState, setHTMLState] = useState<string>('');
  const [deltaState, setDeltaState] = useState<any>({});
  const [showEditor, setShowEditor] = useState(false);

  const [attendeeInfoList, setAttendeeInfoList] = useState<AttendeeInfo[]>([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const handleWYSIWYGChange = (content: string, delta: any) => {
    setHTMLState(content);
    setDeltaState(delta);
  };
  console.log('htmlState', htmlState);
  console.log('deltaState', deltaState);

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const templateData = await queryForTemplate(
          params.userId,
          params.eventId
        );
        if (templateData) {
          console.log(templateData);
          setHTMLState(templateData.htmlContent);
          setBackgroundColor(templateData.backgroundColor);
          setTextColor(templateData.textColor);
        }
      } catch (error) {
        console.error('Error querying for events:', error);
      }
    };
    fetchTemplate();
  }, []);

  const handleSave = async () => {
    // Saving formData logic
    const formData = attendeeInfoList.map((info) => ({
      label: info.accessKey,
      value: (
        document.querySelector(
          `input[name="${info.label.toLowerCase()}"]`
        ) as HTMLInputElement
      ).value
    }));

    // const data = formData.concat(bgColorData, textColorData);
    const attendeeEditorData: Record<string, string> = {};

    // Assign values from formData
    formData.forEach((item) => {
      attendeeEditorData[item.label] = item.value;
    });

    // query for templateId here
    const templateId = await getAllTemplateIds(params.userId, params.eventId);
    const firstTemplateId = templateId[0];

    const eventData = {
      htmlContent: htmlState ?? '',
      deltaState: JSON.stringify(deltaState),
      backgroundColor: backgroundColor ?? '#ffffff',
      textColor: textColor ?? '#000000'
    };

    const data = { ...attendeeEditorData, ...eventData };
    // save data to cloud firestore
    saveTemplate(data, params.userId, params.eventId, firstTemplateId);

    console.log('data saved', data);

    uploadImage(params.userId, params.eventId, imageUpload, setImageUrls);

    setShowSavedMessage(true);

    // Clear the saved message after 3 seconds
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };
  return (
    <div className="bg gray-100 flex">
      <div className="flex flex-1 flex-col border">
        {showEditor ? (
          <AttendeeFormEditor
            params={params}
            attendeeInfoList={attendeeInfoList}
            setAttendeeInfoList={setAttendeeInfoList}
            setBackgroundColor={setBackgroundColor}
            setTextColor={setTextColor}
          />
        ) : (
          <div className="p-4">
            <WYSIWYGContainer
              content={htmlState}
              handleChange={handleWYSIWYGChange}
            />
          </div>
        )}
      </div>
      <div>
        <EditorRightColumn
          handleSave={handleSave}
          showSavedMessage={showSavedMessage}
          userId={params.userId}
          eventId={params.eventId}
          backgroundColor={backgroundColor}
          textColor={textColor}
          setBackgroundColor={setBackgroundColor}
          setTextColor={setTextColor}
          imageUpload={imageUpload}
          setImageUpload={setImageUpload}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
        />
      </div>
    </div>
  );
}
