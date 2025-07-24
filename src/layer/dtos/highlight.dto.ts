import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHighlightDto {
  @ApiProperty({ description: '하이라이트 텍스트', example: '중요한 문장' })
  @IsString()
  @IsNotEmpty()
  readonly highlight_text!: string;

  @ApiProperty({ description: '컨텐츠 ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly content_id!: number;

  @ApiProperty({ description: '요약 ID (요약문 하이라이트 시)', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  readonly summary_id?: number;

  @ApiProperty({ description: '리뷰 ID (리뷰 하이라이트 시)', example: 1, required: false })
  @IsNumber()
  @IsOptional()
  readonly review_id?: number;
}

export class DeleteHighlightDto {
  @ApiProperty({ description: '하이라이트 ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly highlight_id!: number;
}

export class GetHighlightsBySummaryDto {
  @ApiProperty({ description: '요약 ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly summary_id!: number;
}

export class GetHighlightsByReviewDto {
  @ApiProperty({ description: '리뷰 ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  readonly review_id!: number;
}

export class HighlightResponseDto {
  @ApiProperty({ description: '하이라이트 ID', example: 1 })
  highlight_id!: number;

  @ApiProperty({ description: '하이라이트 텍스트', example: '중요한 문장' })
  highlight_text!: string;

  @ApiProperty({ description: '요약 ID', example: 1, required: false })
  summary_id?: number;

  @ApiProperty({ description: '리뷰 ID', example: 1, required: false })
  review_id?: number;

  @ApiProperty({ description: '사용자 ID', example: 1 })
  user_id!: number;

  @ApiProperty({ description: '생성 날짜', example: new Date() })
  created_at!: Date;

  @ApiProperty({ description: '수정 날짜', example: new Date() })
  updated_at!: Date;
}
  