// This is preview form
'use client';
import PreviewForm from '@/components/Editor/Preview_Side/PreviewForm';
import Loader from '@/components/Loader';
import queryForTemplate from '@/utils/queryTemplate';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import 'react-quill/dist/quill.snow.css';
import Button from '@/components/Button';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getStorage
} from 'firebase/storage';
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
            'flex h-screen flex-col p-4',
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
          >
            <Button
              text="To Registration Form"
              className="absolute right-4 top-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={() => {
                setShowEventLandingPage(false);
              }}
            />
          </div>

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
            setImageUrls={setImageUrls}
          />
          {previewMode && (
            <Button
              text="To Event Landing Page"
              className="absolute right-4 top-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
