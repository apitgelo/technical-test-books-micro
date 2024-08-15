import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";
import { IsObjectId } from "./customs/is-object-id";

export class BookCreateInput {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsNumber()
  @IsNotEmpty()
  publishedYear!: number;

  @IsString({ each: true })
  @IsNotEmpty()
  genres!: string[];

  @IsNumber()
  @IsNotEmpty()
  stock!: number;
}

export class BookCreateValidator {
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => BookCreateInput)
  data!: BookCreateInput;
}

export class BookGetPathValidator {
  @IsString()
  @IsNotEmpty()
  @IsObjectId({ message: "Invalid book ID format" })
  bookId!: string;
}
