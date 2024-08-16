/* eslint-disable prettier/prettier */
// src/review/dto/review.dto.ts
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
