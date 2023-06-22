'use client';
import { ReactNode, useState, useEffect } from 'react';
import { FormData } from './PreviewForm';
//
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getStorage
} from 'firebase/storage';
//
type FormWrapperProps = {
  title: string;
  children: ReactNode;
  data: FormData;
};

export function FormWrapper({ title, children, data }: FormWrapperProps) {
  /*
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const storage = getStorage();
  const bucket = ref(storage, `users/${userId}/${eventId}/1`);

  // Retrieving file
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
    if (imageUrls.length > 0) {
      setBackgroundStyle({
        backgroundImage: `url(${imageUrls[0]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      });
    }
  }, [imageUrls]);
  */
  return (
    <>
      <div
        style={{
          color: data['textColor']
          // ...backgroundStyle
        }}
      >
        <h2 className="m-0 mb-8 text-center">{title}</h2>
        <div className="space-x- grid-cols-[auto, minmax(auto, 400px)] grid justify-start space-y-4">
          {children}
        </div>
      </div>
    </>
  );
}
