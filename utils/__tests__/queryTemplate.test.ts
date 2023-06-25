import {
  collection,
  query,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  QuerySnapshot,
  Query,
  getDoc,
  doc
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import queryForTemplate, { Event } from '@/utils/queryTemplate';

jest.useFakeTimers();
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn(),
  getFirestore: jest.fn()
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

describe('queryForTemplate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with undefined if no user is authenticated', async () => {
    const uid = 'user-id';
    const eventId = 'event-id';
    const mockedOnAuthStateChanged = onAuthStateChanged as jest.Mock;
    mockedOnAuthStateChanged.mockImplementationOnce((auth, callback) => {
      callback(null); // Mock no authenticated user
    });

    const result = await queryForTemplate(uid, eventId);

    expect(getAuth).toHaveBeenCalled();
    expect(onAuthStateChanged).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
