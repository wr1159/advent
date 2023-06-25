import { uploadBytes, getDownloadURL, getStorage, ref } from 'firebase/storage';
import uploadImage from '@/utils/uploadImage';

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
  getStorage: jest.fn()
}));

describe('uploadImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uploads image and sets the image URL', async () => {
    const userId = 'testUserId';
    const eventId = 'testEventId';
    const imageUploadMock = new File([], 'testImage.jpg');
    const setImageUrlsMock = jest.fn();
    const snapshotMock = {
      ref: 'testRef'
    };
    const downloadUrl = 'https://example.com/testImage.jpg';

    (getStorage as jest.Mock).mockReturnValue('testStorage');
    (ref as jest.Mock)
      .mockReturnValueOnce('testBucket')
      .mockReturnValueOnce('testFileRef');
    (uploadBytes as jest.Mock).mockResolvedValue(snapshotMock);
    (getDownloadURL as jest.Mock).mockResolvedValue(downloadUrl);

    await uploadImage(userId, eventId, imageUploadMock, setImageUrlsMock);

    expect(getStorage).toHaveBeenCalled();
    expect(ref).toHaveBeenNthCalledWith(
      1,
      'testStorage',
      `users/${userId}/${eventId}/1`
    );
    expect(ref).toHaveBeenNthCalledWith(2, 'testBucket', 'event_image.jpg');
    expect(uploadBytes).toHaveBeenCalledWith('testFileRef', imageUploadMock);
    expect(getDownloadURL).toHaveBeenCalledWith('testRef');
  });

  it('does not upload an image if imageUpload is null', async () => {
    const userId = 'testUserId';
    const eventId = 'testEventId';
    const imageUpload = null;
    const setImageUrls = jest.fn();

    await uploadImage(userId, eventId, imageUpload, setImageUrls);

    expect(uploadBytes).not.toHaveBeenCalled();
    expect(getDownloadURL).not.toHaveBeenCalled();
    expect(setImageUrls).not.toHaveBeenCalled();
  });
});
