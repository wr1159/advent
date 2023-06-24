import { ref, getDownloadURL, listAll, getStorage } from 'firebase/storage';

export default function retrieveImage(
  userId: string,
  eventId: string,
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
) {
  const storage = getStorage();
  const bucket = ref(storage, `users/${userId}/${eventId}/1`);

  // Retrieving Image logic
  //
  listAll(bucket).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        setImageUrls((prev) => [url]);
      });
    });
  });
}
