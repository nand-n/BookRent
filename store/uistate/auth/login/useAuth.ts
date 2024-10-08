import { removeCookie, setCookie } from '@/helpers/storageHelper';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  role: string;
  permissions: string[];
  phone: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      login: (accessToken, refreshToken, user) =>{
        setCookie('token' , accessToken ,30 ),
        set({ accessToken, refreshToken, user, isAuthenticated: true })
      },
      logout: () =>{
        removeCookie('token'),
         set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false })
      }
       
    }),
    {
      name: 'auth',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
