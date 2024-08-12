import useAuthStore from '@/store/uistate/auth/login/useAuth';
import { Book } from '@/types/features/books';
import { crudRequest } from '@/utils/crudRequest';
import { useQuery } from 'react-query';

const useBookGetsByAdminFetcher =async  () => {
    const { accessToken } = useAuthStore.getState();
    
  return  await crudRequest({ url: '/books/all-books-by-admin', method: 'GET' ,   headers: {
      Authorization: `Bearer ${accessToken}`,
    },});
};

const liveBookStatus = async () => {
    const { accessToken } = useAuthStore.getState();
  return await crudRequest({ url: `/books/live-book-status`, method: 'GET' ,  headers: {
    Authorization: `Bearer ${accessToken}`,
  }, });
};

export const useBookGetsByAdmin =  () =>
    useQuery<Book[]>('all-books-by-admin', useBookGetsByAdminFetcher ,{keepPreviousData: true  });

export const useLiveBookStatus = () =>
  useQuery<Book[]>('live-book-status', () => liveBookStatus(), {
    keepPreviousData: true,
  });