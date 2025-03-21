
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
  /* 스웨거에서 자동으로 스키마 인식하도록 하려면 필요하다고 합니다.

  import { ApiProperty } from '@nestjs/swagger';

  export class CreateContentDto {
    @ApiProperty()
    readonly content_title!: string;
  
    @ApiProperty({ enum: ['book', 'drama', 'movie'] })
    readonly content_type!: 'book' | 'drama' | 'movie';
  
    @ApiProperty()
    readonly content_genre!: string;
  
    @ApiProperty()
    readonly content_plot!: string;
  
    @ApiProperty()
    readonly created_at!: Date;
  }
  
  export class ContentResponseDto {
    @ApiProperty()
    content_id!: number;
  
    @ApiProperty()
    content_title!: string;
  
    @ApiProperty({ enum: ['book', 'drama', 'movie'] })
    content_type!: 'book' | 'drama' | 'movie';
  
    @ApiProperty()
    content_genre!: string;
  
    @ApiProperty()
    content_plot!: string;
  
    @ApiProperty()
    created_at!: Date;
  }
  */