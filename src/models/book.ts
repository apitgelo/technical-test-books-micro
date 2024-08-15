import mongoose, { Schema } from "mongoose";
import { BookInterface } from "../interfaces/book-interface";

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

BookSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  }
});

export default mongoose.model<BookInterface>("Book", BookSchema);
