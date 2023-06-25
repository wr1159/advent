import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {
  collection,
  query,
  getDocs,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { firestore } from '@/firebaseconfig';
import queryForEvents, { Event, queryEvents } from '@/utils/event-query';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn(),
  getFirestore: jest.fn()
}));

describe('queryForEvents', () => {
  it('returns undefined when user is not authenticated', async () => {
    const authMock: { currentUser: User | null } = {
      currentUser: null
    };

    (getAuth as jest.Mock).mockReturnValue(authMock);
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(authMock.currentUser);
    });

    const result = await queryForEvents();

    expect(getAuth).toHaveBeenCalled();
    expect(onAuthStateChanged).toHaveBeenCalledWith(
      authMock,
      expect.any(Function)
    );
    expect(result).toBeUndefined();
  });
});
describe('queryEvents', () => {
  it('returns undefined when there are no events', async () => {
    const uid = 'testUid';

    (query as jest.Mock).mockReturnValue('testQuery');
    (getDocs as jest.Mock).mockResolvedValue({ docs: [] });

    const result = await queryEvents(uid);

    expect(query).toHaveBeenCalledWith(
      collection(firestore, `users/${uid}/events`)
    );
    expect(getDocs).toHaveBeenCalledWith('testQuery');
    expect(result).toBeUndefined();
  });
});
