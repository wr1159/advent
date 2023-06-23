'use client';
import React, { useState } from 'react';
import AttendeeFormEditor from '@/components/Editor/Editor_Side/AttendeeFormEditor';
import EditorColumn from '@/components/Editor/Editor_Side/EditorColumn';
import saveTemplate, { getAllTemplateIds } from '@/utils/save-template';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

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
  const [showEditor, setshowEditor] = useState(false);

  const [attendeeInfoList, setAttendeeInfoList] = useState<AttendeeInfo[]>([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [textColor, setTextColor] = useState<string>('#000000');

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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
    // Saving color logic
    const bgColorData = { label: 'bgColor', value: backgroundColor };
    const textColorData = { label: 'textColor', value: textColor };

    const data = formData.concat(bgColorData, textColorData);

    // query for templateId here
    const templateId = await getAllTemplateIds(params.userId, params.eventId);
    const firstTemplateId = templateId[0];
    // save data to cloud firestore
    saveTemplate(data, params.userId, params.eventId, firstTemplateId);

    console.log('data saved', data);

    // Saving image logic to firebase storage
    const storage = getStorage();
    const bucket = ref(storage, `users/${params.userId}/${params.eventId}/1`);
    const fileRef = ref(bucket, 'event_image.jpg');

    if (imageUpload) {
      uploadBytes(fileRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [url]);
        });
      });
    }

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
          <QuillEditor params={params} />
        )}
      </div>
      <EditorColumn
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
      />
    </div>
  );
  // <QuillEditor params= {params}/>
}
