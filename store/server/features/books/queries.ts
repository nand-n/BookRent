import useAuthStore from '@/store/uistate/auth/login/useAuth';
import { Book } from '@/types/features/books';
import { crudRequest } from '@/utils/crudRequest';
import { useMutation, useQuery } from 'react-query';

const useBookGetsByAdminFetcher =async  () => {
    const { accessToken } = useAuthStore.getState();
    
  return  await crudRequest({ url: '/books/all-books-by-admin', method: 'GET' ,   headers: {
      Authorization: `Bearer ${accessToken}`,
    },});
};

// const useBookGetsByAdminFetcher = async (id: string) => {
//   return await crudRequest({ url: `/announcements/${id}`, method: 'GET' });
// };

export const useBookGetsByAdmin =  () =>
    useQuery<Book[]>('all-books-by-admin', useBookGetsByAdminFetcher ,{keepPreviousData: true  });

// export const useBookGetsByAdmin = (id: string) =>
//   useQuery<Book>(['books-by-admin', id], () => useBookGetsByAdminFetcher(id), {
//     keepPreviousData: true,
//   });
