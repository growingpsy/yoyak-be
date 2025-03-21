import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class SummaryDto {
  @IsString()
  summaryId!: string;  

  @IsString()
  summary_title!: string;

  @IsNumber()
  summary_episode!: number;

  @IsString()
  summary_text!: string;
}