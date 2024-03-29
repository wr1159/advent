'use client';
import React, { useEffect, useRef, useState } from 'react';
import AttendeeFormEditor from '@/components/Editor/Editor_Side/AttendeeFormEditor';
import EditorRightColumn from '@/components/Editor/Editor_Side/EditorRightColumn';
import saveTemplate, { getAllTemplateIds } from '@/utils/save-template';
import WYSIWYGContainer from '@/components/Editor/WYSIWYGContainer';
import queryForTemplate from '@/utils/queryTemplate';
import uploadImage from '@/utils/uploadImage';
import Joyride from 'react-joyride';
import { Steps } from '@/utils/walkthroughSteps';
import { PageProps } from '@/types/PageProps';

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
  const [includePayment, setIncludePayment] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [productId, setProductId] = useState('');
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
          setIncludePayment(
            templateData.includePayment === 'true' ? true : false
          );
          setPrice(Number(templateData.price));
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
      value:
        (
          document.querySelector(
            `input[name="${info.label.toLowerCase()}"]`
          ) as HTMLInputElement
        )?.value || ''
    }));

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
      deltaState: JSON.stringify(deltaState) ?? '',
      backgroundColor: backgroundColor ?? '#ffffff',
      textColor: textColor ?? '#000000',
      price: includePayment ? price.toString() : '0', // Include price if includePayment is true, otherwise set it to 0
      includePayment: includePayment ? 'true' : 'false', // Include includePayment value
      productId: productId ?? ''
    };

    const data = { ...attendeeEditorData, ...eventData };
    // save data to firebase storage
    saveTemplate(data, params.userId, params.eventId, firstTemplateId);

    console.log('data saved', data);
    // save image to cloud firestore
    uploadImage(params.userId, params.eventId, imageUpload, setImageUrls);
    setShowSavedMessage(true);

    // Clear the saved message after 3 seconds
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };
  return (
    <div className="bg gray-100 flex">
      <div id="left-section" className="flex flex-1 flex-col border">
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
        <Joyride
          continuous
          hideCloseButton
          scrollToFirstStep
          showProgress
          showSkipButton
          steps={Steps}
          styles={{
            options: {
              arrowColor: '#00264B',
              backgroundColor: '#F4F4F4',
              primaryColor: '#00264B',
              textColor: '#6C6C6C'
            }
          }}
        />

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
          includePayment={includePayment}
          setIncludePayment={setIncludePayment}
          price={price}
          setPrice={setPrice}
        />
      </div>
    </div>
  );
}
