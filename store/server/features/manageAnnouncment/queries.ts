import { crudRequest } from '@/utils/crudRequest';
import { useQuery } from 'react-query';
import { Announcement } from './interface';

const getAllAnnouncements = async () => {
  return await crudRequest({ url: '/announcements', method: 'GET' });
};

const getAnnouncement = async (id: string) => {
  return await crudRequest({ url: `/announcements/${id}`, method: 'GET' });
};

export const useGetAnnouncements = () =>
  useQuery<Announcement[]>('announcements', getAllAnnouncements);

export const useGetAnnouncement = (id: string) =>
  useQuery<Announcement>(['announcement', id], () => getAnnouncement(id), {
    keepPreviousData: true,
  });
