import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: '연관된 컨텐츠 ID' })
  readonly content_id!: number;

  @ApiProperty({ example: '이 영화 정말 감동적이었어요!', description: '리뷰 내용' })
  readonly review_text!: string;
}

export class UpdateReviewDto {
  @ApiProperty({ example: '업데이트된 리뷰 내용', description: '변경할 리뷰 텍스트', required: false })
  readonly review_text?: string;

  @ApiProperty({ example: new Date().toISOString(), description: '수정된 날짜', required: true })
  updated_at!: Date;
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
}
