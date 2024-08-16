/* eslint-disable prettier/prettier */
export class CreateReviewDto {
  readonly productId: string;
  readonly userId: string;
  readonly rating: number;
  readonly comment: string;
}

export class UpdateReviewDto {
  readonly rating?: number;
  readonly comment?: string;
}
