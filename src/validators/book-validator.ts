import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
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

export class BookBrowseParamsValidator {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  genres?: string;
}

export class BookUpdateInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  publishedYear?: number;

  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty()
  genres?: string[];

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  stock?: number;
}

export class BookUpdateValidator {
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => BookUpdateInput)
  data!: BookUpdateInput;
}

export class BookIdPathValidator {
  @IsString()
  @IsNotEmpty()
  @IsObjectId({ message: "Invalid book ID format" })
  bookId!: string;
}
