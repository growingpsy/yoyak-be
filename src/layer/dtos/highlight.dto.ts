export class CreateHighlightDto {
    readonly highlight_text!: string;
    readonly summary_id!: number;
  }
  
  export class HighlightResponseDto {
    highlight_id!: number;
    highlight_text!: string;
    created_at!: Date;
    summary_id!: number;
  }
  