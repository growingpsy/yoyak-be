import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSummaryDto {
  @ApiProperty({ description: '요약 텍스트' })
  @IsString()
  summary_text!: string;

  @ApiProperty({ description: '요약 제목' })
  @IsString()
  summary_title!: string;

  @ApiProperty({ description: '요약이 속한 에피소드 번호' })
  @IsNumber()
  summary_episode!: number;

  @ApiProperty({ description: '긴 요약 여부' })
  @IsBoolean()
  is_long!: boolean;

  @ApiProperty({ description: '스포일러 여부' })
  @IsBoolean()
  contains_spoiler!: boolean;

  @ApiProperty({ description: '컨텐츠 ID' })
  @IsNumber()
  content_id!: number;


}


export class SummaryResponseDto {
  @ApiProperty({ description: '요약 ID' })
  summary_id!: number;

  @ApiProperty({ description: '요약 텍스트' })
  summary_text!: string;

  @ApiProperty({ description: '요약 제목' })
  summary_title!: string;

  @ApiProperty({ description: '에피소드 번호' })
  summary_episode!: number;

  @ApiProperty({ description: '긴 요약 여부' })
  is_long!: boolean;

  @ApiProperty({ description: '스포일러 포함 여부' })
  contains_spoiler!: boolean;

  @ApiProperty({ description: '컨텐츠 ID' })
  content_id!: number;

  @ApiProperty({ description: '작성자 ID' })
  user_id!: number;

  @ApiProperty({ description: '생성일시' })
  created_at!: Date;

  @ApiProperty({ description: '수정일시' })
  updated_at!: Date;
}

export class UpdateSummaryDto {
  @ApiProperty({ description: '요약 제목' })
  @IsString()
  summary_title!: string;

  @ApiProperty({ description: '에피소드 번호' })
  @IsNumber()
  summary_episode!: number;

  @ApiProperty({ description: '요약 텍스트' })
  @IsString()
  summary_text!: string;

  @ApiPropertyOptional({ description: '긴 요약 여부' })
  @IsBoolean()
  @IsOptional()
  is_long?: boolean;

  @ApiPropertyOptional({ description: '스포일러 포함 여부' })
  @IsBoolean()
  @IsOptional()
  contains_spoiler?: boolean;

  @ApiProperty({ description: '컨텐츠 ID' })
  @IsNumber()
  content_id!: number;


}

