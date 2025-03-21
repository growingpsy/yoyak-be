import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';


export class CreateSummaryDto {
  @IsString()
  summary_text!: string;

  @IsString()
  summary_title!: string;

  @IsNumber()
  summary_episode!: number;

  @IsBoolean()
  is_long!: boolean;

  @IsBoolean()
  contains_spoiler!: boolean;

  @IsNumber()
  content_id!: number;

  @IsNumber()
  user_id!: number;
}


export class SummaryResponseDto {
  @IsNumber()
  summary_id!: number;

  @IsString()
  summary_text!: string;

  @IsBoolean()
  is_long!: boolean;

  @IsBoolean()
  contains_spoiler!: boolean;

  @IsNumber()
  content_id!: number;

  @IsNumber()
  user_id!: number;

  @IsString()
  created_at!: Date;

  @IsString()
  updated_at!: Date;
}


export class UpdateSummaryDto {
  @IsString()
  summaryId!: string;

  @IsString()
  summary_title!: string;

  @IsNumber()
  summary_episode!: number;

  @IsString()
  summary_text!: string;

  @IsBoolean()
  @IsOptional()
  is_long?: boolean;

  @IsBoolean()
  @IsOptional()
  contains_spoiler?: boolean;

  @IsNumber()
  content_id!: number;

  @IsNumber()
  user_id!: number;
}
