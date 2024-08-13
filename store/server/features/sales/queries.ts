import { useQuery } from 'react-query';
import { EarningsSummary, MonthlyStatistics } from '@/types/features/sales';
import useAuthStore from '@/store/uistate/auth/login/useAuth';
import { crudRequest } from '@/utils/crudRequest';

/**
 * Function to fetch monthly sales statistics by sending a GET request to the API.
 * 
 * @returns The response data from the API as a promise.
 */
const getMonthlySalesStatistics = async (): Promise<MonthlyStatistics> => {
  const { accessToken } = useAuthStore.getState();

  return await crudRequest({
    url: '/sales/monthly-statistics',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * Function to fetch monthly sales statistics by sending a GET request to the API.
 * 
 * @returns The response data from the API as a promise.
 */
const getEarningSummary = async (): Promise<EarningsSummary[]> => {
    const { accessToken } = useAuthStore.getState();
  
    return await crudRequest({
      url: '/sales/earnings-summary',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

/**
 * Custom hook to fetch monthly sales statistics using `useQuery` from `react-query`.
 * 
 * @returns The query object for fetching the monthly sales statistics.
 * 
 * @description
 * This hook uses `useQuery` to fetch the monthly sales statistics from the API. It returns
 * the query object containing the data, loading, and error states.
 */
export const useGetMonthlySalesStatistics = () =>
  useQuery<MonthlyStatistics>('statistics', getMonthlySalesStatistics, {
    keepPreviousData: true,
  });


  /**
 * Custom hook to fetch monthly sales statistics using `useQuery` from `react-query`.
 * 
 * @returns The query object for fetching the monthly sales statistics.
 * 
 * @description
 * This hook uses `useQuery` to fetch the monthly sales statistics from the API. It returns
 * the query object containing the data, loading, and error states.
 */
export const useGetEarningSummary = () =>
    useQuery<EarningsSummary[]>('earning-statistics', getEarningSummary, {
      keepPreviousData: true,
    });