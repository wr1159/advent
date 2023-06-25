'use client';
import { useEffect, useRef } from 'react';
import { ref, getDownloadURL, listAll, getStorage } from 'firebase/storage';
import Button from '@/components/Button';
import Image from 'next/image';
import retrieveImage from '@/utils/retrieveImage';

interface ImageUploadProps {
  userId: string;
  eventId: string;
  imageUpload: File | null;
  setImageUpload: React.Dispatch<React.SetStateAction<File | null>>;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

function ImageUpload({
  userId,
  eventId,
  imageUpload,
  setImageUpload,
  imageUrls,
  setImageUrls
}: ImageUploadProps) {
  // Section for hiding the default input button and asssigning its functionality to another Button component for styling
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Hide the file input element after the initial render on the client side
    if (fileInputRef.current) {
      fileInputRef.current.style.display = 'none';
    }
  }, []);

  const selectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Retrieving file
  useEffect(() => {
    retrieveImage(userId, eventId, setImageUrls);
  }, []);

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <input
          type="file"
          onChange={(event) => {
            if (event.target.files) {
              setImageUpload(event.target.files[0]);
              setImageUrls([URL.createObjectURL(event.target.files[0])]);
            }
          }}
          ref={fileInputRef}
          data-testid="photo-uploader"
          className="hidden"
        />
        <Button
          onClick={selectImage}
          text="Select Image"
          theme="secondary"
          className="mb-4 bg-accent px-4 py-2 shadow"
        />
        <div className="mb-4 flex justify-center">
          {imageUrls.map((url, index) => (
            <div key={index} className="aspect-w-3 aspect-h-2">
              <Image
                width={500}
                height={500}
                src={url}
                className="rounded-lg object-cover"
                alt="image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
