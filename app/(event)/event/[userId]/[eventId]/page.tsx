'use client';
import Loader from '@/components/Loader';
import queryForTemplate from '@/utils/queryTemplate';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface PageProps {
  userId: string;
  eventId: string;
}

export default function Template({ params }: { params: PageProps }) {
  // useState templateData that is an record of strings to strings
  const [data, setData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    };

    fetchTemplate();
    setIsLoading(false);
  }, []);

  return (
    <div
      className={twMerge(
        'flex  h-screen flex-col items-center p-8',
        `bg-[${data['bgColour']}]`,
        `text-[${data['textColour']}]`
      )}
      style={{ color: data['textColour'], backgroundColor: data['bgColour'] }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        Object.entries(data).map(([key, value]) => {
          if (
            key !== 'title' &&
            key !== 'description' &&
            key !== 'date' &&
            key !== 'location' &&
            key !== 'event_id' &&
            key !== 'bgColour' &&
            key !== 'textColour'
          ) {
            return (
              <div className="mb-4" key={key}>
                <h3 className="mb-2 text-lg font-semibold">{key}</h3>
                <p className={'text-' + value}>{value}</p>
              </div>
            );
          }
          return null;
        })
      )}
    </div>
  );
}
