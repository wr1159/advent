'use client';
import queryForTemplate from '@/utils/queryTemplate';
import { useEffect, useState } from 'react';

interface PageProps {
  userId: string;
  eventId: string;
}

export default function Template({ params }: { params: PageProps }) {
  // useState templateData that is an record of strings to strings
  const [data, setData] = useState<Record<string, string>>({});

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
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="mb-4 text-3xl font-bold">{data.title}</h1>
      <p className="mb-2 text-accent">{data.description}</p>
      <p className="mb-2 text-accent">Date: {data.date}</p>
      <p className="mb-2 text-accent">Location: {data.location}</p>

      {Object.entries(data).map(([key, value]) => {
        if (
          key !== 'title' &&
          key !== 'description' &&
          key !== 'date' &&
          key !== 'location' &&
          key !== 'event_id'
        ) {
          return (
            <div className="mb-4" key={key}>
              <h3 className="mb-2 text-lg font-semibold">{key}</h3>
              <p className="text-gray-600">{value}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
