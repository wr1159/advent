'use client';
import PreviewForm from '@/components/Editor/Preview_Side/PreviewForm';
import Loader from '@/components/Loader';
import queryForTemplate from '@/utils/queryTemplate';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import 'react-quill/dist/quill.snow.css';
import Button from '@/components/Button';
import retrieveImage from '@/utils/retrieveImage';
interface PageProps {
  userId: string;
  eventId: string;
}

export default function Template({ params }: { params: PageProps }) {
  // useState templateData that is an record of strings to strings
  const [data, setData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showEventLandingPage, setShowEventLandingPage] =
    useState<boolean>(true);
  //  previewMode will be set to false when users copy the iframe
  const [previewMode, setPreviewMode] = useState<boolean>(true);
  // image URL to use here or pass down as prop to child components
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Retrieving Image logic

  useEffect(() => {
    retrieveImage(params.userId, params.eventId, setImageUrls);
  }, []);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        console.log('1');
        const templateData = await queryForTemplate(
          params.userId,
          params.eventId
        );
        if (templateData) {
          console.log('templateData', templateData);
          setData(templateData);
        }
      } catch (error) {
        console.error('Error querying for events:', error);
      }
      setIsLoading(false);
    };

    fetchTemplate();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : showEventLandingPage ? (
        <div
          className={twMerge(
            'flex h-screen flex-col p-2',
            `text-[${data['textColour']}]`
          )}
          style={{
            color: data['textColor'],
            backgroundColor: data['backgroundColor']
          }}
        >
          <div
            className="bg-image relative h-1/4 bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrls[0]})` }}
          ></div>
          <Button
            text="To Registration Form"
            theme="secondary"
            className="absolute top-4 right-4 w-[225px]"
            onClick={() => {
              setShowEventLandingPage(false);
            }}
          />

          <div
            className="view ql-editor"
            dangerouslySetInnerHTML={{ __html: data.htmlContent }}
          />
        </div>
      ) : (
        <>
          <PreviewForm
            params={params}
            imageUrls={imageUrls}
            backgroundColor={data['backgroundColor']}
          />
          {previewMode && (
            <Button
              text="To Event Landing Page"
              theme="secondary"
              className="absolute top-4 right-4 w-[225px]"
              onClick={() => {
                setShowEventLandingPage(true);
              }}
            />
          )}
        </>
      )}
    </>
  );
}
