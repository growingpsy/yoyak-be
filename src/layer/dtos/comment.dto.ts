import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: '댓글 내용', example: '정말 유익한 요약이네요!' })
  @IsString()
  @IsNotEmpty()
  comment_text!: string;

  @ApiProperty({ description: '부모 댓글 ID', example: 0, required: false })
  @IsOptional()
  @IsNumber()
  comment_parent_id?: number;
}

export class UpdateCommentDto {
  @ApiProperty({ description: '수정할 댓글 내용', example: '수정된 댓글 내용' })
  @IsString()
  @IsNotEmpty()
  comment_text!: string;
}

export class DeleteCommentDto {
  @ApiProperty({ description: '댓글 ID', example: 1 })
  @IsNumber()
  comment_id!: number;
}

export class GetCommentsBySummaryDto {
  @ApiProperty({ description: 'Summary ID', example: 1 })
  @IsNumber()
  summary_id!: number;
}