import { create } from "zustand";
import { BookPublishState } from "./interface";
import { UploadFile } from "antd";


export const useBookPublish = create<BookPublishState>((set) => ({
  selectedBookId: '',
  quantity: 1,
  rentPrice: 0,
  coverImage: undefined,
  setSelectedBook: (bookId: string) => set({ selectedBookId: bookId }),
  setQuantity: (quantity: number) => set({ quantity }),
  setRentPrice: (price: number) => set({ rentPrice: price }),
  setCoverImage: (file: UploadFile<any> | undefined) => set({ coverImage: file }),
}));