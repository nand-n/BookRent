import { Book } from '@/types/features/books';
import { crudRequest } from '@/utils/crudRequest';
import { useQuery } from 'react-query';

const getCategory =async  () => {
  return  await crudRequest({ url: '/categories', method: 'GET' });
};


export const useGetCategory =  () =>
    useQuery<Book[]>('category', getCategory ,{keepPreviousData: true  });

