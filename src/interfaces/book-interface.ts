import { Document } from "mongoose";

export interface BookInterface extends Document {
  title: string;
  author: string;
  publishedYear: number;
  genres: string[];
  stock: number;
}
