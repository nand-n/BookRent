import { useMutation, useQueryClient } from 'react-query';
import useAuthStore from '@/store/uistate/auth/login/useAuth';
import { crudRequest } from '@/utils/crudRequest';

/**
 * Function to approve a book by sending a PATCH request to the API.
 * @param data The data object containing the book ID.
 * @returns The response data from the API.
 */
const deleteBook = async ( id: string ) => {
  const { accessToken } = useAuthStore.getState();

  return await crudRequest({
    url: `/books/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Function to add a book by sending a POST request to the API.
 * @param data The data object containing the book creation values.
 * @returns The response data from the API.
 */
const addBook = async (data:any) => {
    const { accessToken } = useAuthStore.getState();
  
    return await crudRequest({
      url: `/books`,
      method: 'POST',
      data:data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

/**
 * Custom hook to approve a book using useMutation from react-query.
 * @returns The mutation object for publishing a book.
 * 
 * @description
 * This hook handles the mutation to publish a book. On successful mutation,
 * it invalidates the "books" query to refetch the latest data.
 */
export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBook, {  
    onSuccess: () => {
      queryClient.invalidateQueries('books');
      queryClient.invalidateQueries("all-books-by-admin");        
    },
  });
};

/**
 * Custom hook to add a book using useMutation from react-query.
 * @returns The mutation object for creting  a book.
 * 
 * @description
 * This hook handles the mutation to approve a book. On successful mutation,
 * it invalidates the "books" and "all-books-by-admin" query to refetch the latest data.
 */
export const useAddBook = () => {
    const queryClient = useQueryClient();
    return useMutation(addBook, {
      onSuccess: () => {
        queryClient.invalidateQueries('books')
        queryClient.invalidateQueries("all-books-by-admin");        
      },
    });
  };
  


