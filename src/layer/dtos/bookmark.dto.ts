import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({
    description: '북마크할 요약문 ID',
    example: 42,
  })
  @IsNumber()
  @IsNotEmpty()
  summary_id!: number;
}