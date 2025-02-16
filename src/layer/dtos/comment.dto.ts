export class CreateCommentDto {
    readonly comment_parent_id!: number;
    readonly comment_text!: string;
    readonly summary_id!: number;
  }
  
  export class CommentResponseDto {
    comment_id!: number;
    comment_parent_id!: number;
    comment_text!: string;
    created_at!: Date;
    updated_at!: Date;
    summary_id!: number;
  }  