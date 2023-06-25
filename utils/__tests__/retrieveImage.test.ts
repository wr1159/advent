import { ref, getDownloadURL, listAll, getStorage } from 'firebase/storage';
import retrieveImage from '@/utils/retrieveImage';

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
  listAll: jest.fn(),
  getStorage: jest.fn()
}));

describe('retrieveImage', () => {
  it('retrieves and sets image URLs', async () => {
    const userId = 'testUserId';
    const eventId = 'testEventId';
    const setImageUrlsMock = jest.fn();
    const item1 = {
      name: 'image1.jpg'
    };
    const item2 = {
      name: 'image2.jpg'
    };
    const responseMock = {
      items: [item1, item2]
    };
    const downloadUrl1 = 'https://example.com/image1.jpg';
    const downloadUrl2 = 'https://example.com/image2.jpg';

    (ref as jest.Mock).mockReturnValue('testRef');
    (getStorage as jest.Mock).mockReturnValue('testStorage');
    (listAll as jest.Mock).mockResolvedValue(responseMock);
    (getDownloadURL as jest.Mock)
      .mockResolvedValueOnce(downloadUrl1)
      .mockResolvedValueOnce(downloadUrl2);

    await retrieveImage(userId, eventId, setImageUrlsMock);

    expect(ref).toHaveBeenCalledWith(
      'testStorage',
      `users/${userId}/${eventId}/1`
    );
    expect(listAll).toHaveBeenCalledWith('testRef');
    expect(getDownloadURL).toHaveBeenNthCalledWith(1, item1);
    expect(getDownloadURL).toHaveBeenNthCalledWith(2, item2);
  });

  it('handles empty response', async () => {
    const userId = 'testUserId';
    const eventId = 'testEventId';
    const setImageUrlsMock = jest.fn();
    const responseMock = {
      items: []
    };

    (ref as jest.Mock).mockReturnValue('testRef');
    (getStorage as jest.Mock).mockReturnValue('testStorage');
    (listAll as jest.Mock).mockResolvedValue(responseMock);

    await retrieveImage(userId, eventId, setImageUrlsMock);

    expect(ref).toHaveBeenCalledWith(
      'testStorage',
      `users/${userId}/${eventId}/1`
    );
    expect(listAll).toHaveBeenCalledWith('testRef');
    expect(setImageUrlsMock).not.toHaveBeenCalled();
  });
});
