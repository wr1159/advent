import { setDoc, doc } from 'firebase/firestore';
import saveTemplate from '@/utils/saveTemplate';
import { firestore } from '@/firebaseconfig';

// Mock the Firebase Firestore functions
jest.mock('firebase/firestore', () => ({
  setDoc: jest.fn(),
  doc: jest.fn(),
  getFirestore: jest.fn(),
  collection: jest.fn()
}));

describe('saveTemplate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call setDoc with the correct arguments', async () => {
    const data = {
      title: 'Sample Title',
      description: 'Sample Description',
      date: '2023-06-25',
      location: 'Sample Location'
    };
    const user_id = 'user123';
    const event_id = 'event123';
    const template_id = 'template123';

    await saveTemplate(data, user_id, event_id, template_id);

    expect(doc).toHaveBeenCalledWith(
      firestore,
      `users/${user_id}/events/${event_id}/templates/${template_id}`
    );
    expect(setDoc).toHaveBeenCalled();
  });
});
