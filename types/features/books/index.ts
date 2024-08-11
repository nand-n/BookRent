import { User } from "../users"

export interface Category {
    id: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
    name: string
  }
export interface Book {
    id: string,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
    name: string,
    authorName: string,
    bookNumber: number,
    bookAvailablitystatus: string,
    status: boolean,
    approved: boolean,
    bookQuantity: null,
    price: 0,
    coverImageUrl?: null,
    pdfUrl?: string,
    user: User
    category:Category
}