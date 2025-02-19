export class CreateReviewDto {
    readonly review_text!: string;
    readonly summary_id!: number;
  }
  
  export class ReviewResponseDto {
    review_id!: number;
    review_text!: string;
    created_at!: Date;
    summary_id!: number;
  }
  