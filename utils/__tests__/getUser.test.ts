import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import getUserId from '@/utils/getUser';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

describe('getUserId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with the user ID if a user is authenticated', async () => {
    const mockedUser: Partial<User> = { uid: 'user-id' };
    const mockedOnAuthStateChanged = onAuthStateChanged as jest.Mock;
    mockedOnAuthStateChanged.mockImplementationOnce((auth, callback) => {
      callback(mockedUser as User);
    });

    const result = await getUserId();

    expect(getAuth).toHaveBeenCalled();
    expect(onAuthStateChanged).toHaveBeenCalled();
    expect(result).toEqual('user-id');
  });

  it('should resolve with undefined if no user is authenticated', async () => {
    const mockedOnAuthStateChanged = onAuthStateChanged as jest.Mock;
    mockedOnAuthStateChanged.mockImplementationOnce((auth, callback) => {
      callback(null);
    });

    const result = await getUserId();

    expect(getAuth).toHaveBeenCalled();
    expect(onAuthStateChanged).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
