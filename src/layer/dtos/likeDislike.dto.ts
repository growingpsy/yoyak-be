import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLikeDislikeDto {
    readonly summary_id!: number;
  }
  
  export class LikeDislikeResponseDto {
    like_id!: number;
    dislike_id!: number;
    created_at!: Date;
    summary_id!: number;
  }  