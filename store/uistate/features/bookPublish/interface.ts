import { UploadFile } from 'antd/es/upload/interface';

export interface BookPublishState {
  selectedBookId: string;
  quantity: number;
  rentPrice: number;
  coverImage: UploadFile<any> | undefined;
  setSelectedBook: (bookId: string) => void;
  setQuantity: (quantity: number) => void;
  setRentPrice: (price: number) => void;
  setCoverImage: (file: UploadFile<any> | undefined) => void;
}