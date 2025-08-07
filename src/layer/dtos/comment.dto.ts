import {
  ApiProperty,
  ApiPropertyOptional,
  ApiExtraModels,
} from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 댓글 생성 DTO
 */
export class CreateCommentDto {
  @ApiProperty({
    description: '댓글 내용',
    example: '정말 유익한 요약이네요!',
  })
  @IsString()
  @IsNotEmpty()
  comment_text!: string;

  @ApiPropertyOptional({
    description: '부모 댓글 ID (대댓글 작성 시 사용)',
    example: null,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  comment_parent_id?: number;
}

/**
 * 댓글 수정 DTO
 */
export class UpdateCommentDto {
  @ApiProperty({
    description: '수정할 댓글 내용',
    example: '수정된 댓글입니다.',
  })
  @IsString()
  @IsNotEmpty()
  comment_text!: string;
}

/**
 * 사용자 정보 DTO (user_nick만 노출)
 */
export class UserInfoDto {
  @ApiProperty({
    description: '사용자 닉네임',
    example: 'yoyakswuni',
  })
  user_nick!: string;
}

/**
 * 댓글 응답 DTO (재귀 구조 포함)
 */
@ApiExtraModels(CommentResponseDto)
export class CommentResponseDto {
  @ApiProperty({ description: '댓글 ID', example: 1 })
  comment_id!: number;

  @ApiProperty({
    description: '댓글 내용',
    example: '정말 유익한 요약이네요!',
  })
  comment_text!: string;

  @ApiPropertyOptional({
    description: '부모 댓글 ID',
    example: null,
  })
  comment_parent_id?: number;

  @ApiProperty({ description: '작성자 ID', example: 9 })
  user_id!: number;

  @ApiProperty({ description: 'Summary ID', example: 1 })
  summary_id!: number;

  @ApiProperty({
    description: '댓글 생성 시간',
    example: '2025-08-07T18:17:06.000Z',
  })
  created_at!: Date;

  @ApiProperty({
    description: '댓글 수정 시간',
    example: '2025-08-07T18:17:06.000Z',
  })
  updated_at!: Date;

  @ApiProperty({
    description: '작성자 정보',
    type: () => UserInfoDto,
  })
  user!: UserInfoDto;

  @ApiProperty({
    description: '대댓글 리스트',
    type: () => [CommentResponseDto],
    example: [],
  })
  @Type(() => CommentResponseDto)
  replies!: CommentResponseDto[];
}