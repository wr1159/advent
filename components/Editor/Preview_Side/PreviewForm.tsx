// This is preview form
'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import { useMultistepForm } from '@/utils/useMultistepForm';
import Button from '@/components/Button';
import DataPage from '@/components/Editor/Preview_Side/DataPage';
// import TimeSlotSelectionPage from '@/components/Editor/Preview_Side/TimeSlotSelectionPage';
// import PaymentPage from '@/components/Editor/Preview_Side/PaymentPage';
import queryForTemplate from '@/utils/queryTemplate';
//
import addAttendee from '@/utils/add-attendee';
//

interface PageProps {
  userId: string;
  eventId: string;
}

export type FormData = {
  [key: string]: string | undefined;
};

export const INITIAL_DATA: FormData = {};

export default function PreviewForm({
  params,
  imageUrls,
  backgroundColor
}: {
  params: PageProps;
  imageUrls: string[];
  backgroundColor: string;
}) {
  const [data, setData] = useState(INITIAL_DATA);

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
      <DataPage
        data={data}
        updateFields={updateFields}
        imageUrls={imageUrls}
        key={0}
      />,
      <div key={1}>Demo</div>
      // <TimeSlotSelectionPage data={data} updateFields={updateFields} />,
      // <PaymentPage data={data} updateFields={updateFields} key={1} />
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
    <div className="flex justify-center">
      <div
        className={`m-4 ml-auto mr-auto w-1/2 rounded-lg p-8 shadow-md`}
        style={{ backgroundColor }}
        data-testid="form-background-color"
      >
        <form onSubmit={handleSubmit}>
          {step}
          <div className="mt-4 flex justify-center">
            {!isFirstStep && (
              <Button
                text="Back"
                type="button"
                className="mr-2 flex items-center justify-center rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 focus:bg-gray-400 focus:outline-none"
                onClick={back}
              />
            )}
            <Button
              text={isLastStep ? 'Submit' : 'Next'}
              type="submit"
              className="flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 focus:bg-emerald-600 focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
