import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

export default function uploadImage(
  userId: string,
  eventId: string,
  imageUpload: File | null,
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
) {
  const storage = getStorage();
  const bucket = ref(storage, `users/${userId}/${eventId}/1`);
  const fileRef = ref(bucket, 'event_image.jpg');
  // Upload Image logic
  if (imageUpload) {
    uploadBytes(fileRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [url]);
      });
    });
  }
}
