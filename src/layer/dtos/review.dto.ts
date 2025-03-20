import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: '연관된 컨텐츠 ID' })
  @IsInt({ message: 'content_id는 정수여야 합니다.' })
  readonly content_id!: number;

  @ApiProperty({ example: '이 영화 정말 감동적이었어요!', description: '리뷰 내용' })
  @IsString({ message: 'review_text는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: 'review_text는 비워둘 수 없습니다.' })
  readonly review_text!: string;
}

export class UpdateReviewDto {
  @ApiProperty({ example: '업데이트된 리뷰 내용', description: '변경할 리뷰 텍스트', required: false })
  @IsString({ message: 'review_text는 문자열이어야 합니다.' })
  @IsOptional()
  review_text?: string;
}

export class ReviewResponseDto {
  @ApiProperty({ example: 1, description: '리뷰 ID' })
  review_id!: number;

  @ApiProperty({ example: 1, description: '연관된 컨텐츠 ID' })
  content_id!: number;

  @ApiProperty({ example: '이 영화 정말 감동적이었어요!', description: '리뷰 내용' })
  review_text!: string;

  @ApiProperty({ example: new Date().toISOString(), description: '리뷰 생성 날짜' })
  created_at!: Date;

  @ApiProperty({ example: new Date().toISOString(), description: '리뷰 수정 날짜' })
  updated_at!: Date;
}
