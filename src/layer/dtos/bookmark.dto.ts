export class CreateBookmarkDto {
    readonly created_at!: Date;  
    readonly summary_id!: number;
  }
  
  export class BookmarkResponseDto {
    bookmark_id!: number;  
    created_at!: Date;  
    summary_id!: number;  
  }
  