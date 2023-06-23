// This is preview form
'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import { useMultistepForm } from '@/utils/useMultistepForm';
import Button from '@/components/Button';
import DataPage from '@/components/Editor/Preview_Side/DataPage';
// import TimeSlotSelectionPage from '@/components/Editor/Preview_Side/TimeSlotSelectionPage';
import PaymentPage from '@/components/Editor/Preview_Side/PaymentPage';
import queryForTemplate from '@/utils/queryTemplate';
//
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getStorage
} from 'firebase/storage';
import addAttendee from '@/utils/add-attendee';
//

interface PageProps {
  userId: string;
  eventId: string;
}

export type FormData = {
  [key: string]: string | undefined;
};

const INITIAL_DATA: FormData = {};

export default function PreviewForm({ params }: { params: PageProps }) {
  const [data, setData] = useState(INITIAL_DATA);
  // image URL to use here or pass down as prop to child components
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // storage and buckets as image reference
  const storage = getStorage();
  const bucket = ref(storage, `users/${params.userId}/${params.eventId}/1`);

  // Retrieving Image logic
  useEffect(() => {
    listAll(bucket).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [url]);
        });
      });
    });
  }, []);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const templateData = await queryForTemplate(
          params.userId,
          params.eventId
        );
        if (templateData) {
          const updatedData: FormData = { ...data, ...templateData };
          setData(updatedData);
        }
      } catch (error) {
        console.error('Error querying for template:', error);
      }
    };
    fetchTemplate();
  }, []);

  const { steps, step, currentStepIndex, isFirstStep, back, isLastStep, next } =
    useMultistepForm([
      <DataPage data={data} updateFields={updateFields} />,
      // <TimeSlotSelectionPage data={data} updateFields={updateFields} />,
      <PaymentPage data={data} updateFields={updateFields} />
    ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();

    const submitTime = new Date().toISOString();

    // Concatenate the submit time to data
    const updatedData = { ...data, submitTime };

    addAttendee(updatedData, params.userId, params.eventId);
    alert('Successful');
  };

  return (
    <div
      className="font-sans} relative m-4 ml-auto mr-auto max-w-max rounded-lg border border-solid border-black bg-white p-8"
      style={{ backgroundImage: `url(${imageUrls[0]})` }}
    >
      <form onSubmit={handleSubmit}>
        {/* <div className="absolute right-4 top-2 ">
          {currentStepIndex + 1} / {steps.length}
        </div> */}
        {step}
        <div className="mt-4 flex justify-end gap-2">
          {!isFirstStep && <Button text="Back" type="button" onClick={back} />}
          <Button text={isLastStep ? 'Submit' : 'Next'} type="submit" />
        </div>
      </form>
    </div>
  );
}
