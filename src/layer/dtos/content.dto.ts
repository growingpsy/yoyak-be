import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateContentDto {
    readonly content_title!: string;
    readonly content_type!: 'book' | 'drama' | 'movie';
    readonly content_genre!: string;
    // readonly content_genre!: 'Action' | 'Adventure' | .. 19개
    readonly content_plot!: string;
    readonly created_at!: Date;
  }
  
  export class ContentResponseDto {
    content_id!: number;
    content_title!: string;
    content_type!: 'book' | 'drama' | 'movie';
    content_genre!: string;
    content_plot!: string;
    created_at!: Date;
    review_id!: number;
  }