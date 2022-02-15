import { useUserState } from '../atoms/userAtom';
import { axiosApi } from '../lib/axios';

export const useAuth = () => {
  const { user, setUser } = useUserState();

  const checkLoggedIn = async (): Promise<boolean> => {
    if (user) {
      return true;
    }

    try {
      const res = await axiosApi.get('/api/user');
      if (!res.data.data) {
        return false;
      }
      setUser(res.data.data);
      return true;
    } catch {
      return false;
    }
  };

  return { checkLoggedIn };
};
