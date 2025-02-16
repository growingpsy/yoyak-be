export class CreateSummaryDto {
  readonly summary_text!: string; 
  readonly is_long!: boolean;
  readonly contains_spoiler!: boolean;
  readonly content_id!: number;
  readonly user_id!: number;
}

export class SummaryResponseDto {
  summary_id!: number;
  summary_text!: string;
  is_long!: boolean;
  contains_spoiler!: boolean;
  created_at!: Date;
  updated_at!: Date;
  content_id!: number;
  user_id!: number;
}
