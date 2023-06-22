'use client';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getStorage
} from 'firebase/storage';
import Button from '@/components/Button';
interface ImageUploadProps {
  userId: string;
  eventId: string;
}

function ImageUpload({ userId, eventId }: ImageUploadProps) {
  const template_id = '1';
  // add logic for user_id and event_id actual upload and retrieval by passing it down here
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

  // Section for uploading and retrieving image logic
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [showUploadedMessage, setShowUploadedMessage] = useState(false);

  const storage = getStorage();
  const bucket = ref(storage, `users/${userId}/${eventId}/${template_id}`);
  const fileRef = ref(bucket, 'event_image.jpg');

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

  // Uploading file
  const uploadFile = () => {
    if (imageUpload == null) return;
    uploadBytes(fileRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [url]);
      });
    });
    setShowUploadedMessage(true);

    // Clear the saved message after 3 seconds
    setTimeout(() => {
      setShowUploadedMessage(false);
    }, 3000);
  };

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
          className="hidden"
        />
        <Button
          onClick={selectImage}
          text="Select Image"
          className="mb-4 rounded-full bg-blue-500 px-4 py-2 font-medium text-white shadow"
        />
        <div className="mb-4 flex justify-center">
          {imageUrls.map((url, index) => (
            <div key={index} className="aspect-w-3 aspect-h-2">
              <img src={url} className="rounded-lg object-cover" />
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <Button
            onClick={uploadFile}
            text="Upload"
            className="mr-4 rounded-full bg-green-500 px-4 py-2 font-medium text-white shadow"
          />
          {showUploadedMessage && (
            <div className="flex items-center text-emerald-500">
              <AiOutlineCheck className="mr-2" />
              Saved!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
