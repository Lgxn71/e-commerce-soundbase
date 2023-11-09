import { User as NextAuthUser } from "next-auth/core";
import type { ObjectId } from "mongodb";

export interface Record {
  _id: ObjectId | string;
  artist: string;
  albumName: string;
  releaseDate: string;
  imagePath: string;
  songs: string[];
  price: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  genres: string[];
  quantity?: number;
}

export interface Artist {
  _id: ObjectId | string;
  aboutArtist: number;
  soldVinyls: number;
  views: number;
  artist: string;
  featured: string;
  imagePath: string;
}

export interface User extends NextAuthUser {
  _id: ObjectId | string;
  name: string;
  email: string;
  address: string;
  hashedPassword: string;
  orders?: Order[];
}
export interface Order {
  orderId: string;
  albums: Record[];
  date: Date;
  isOpen?: boolean;
}
