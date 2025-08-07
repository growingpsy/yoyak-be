// src/converters/comment.converter.ts
import { CommentResponseDto } from '../dtos/comment.dto';

export class CommentConverter {
  static toDto(entity: any): CommentResponseDto {
    const dto = new CommentResponseDto();
    dto.comment_id = entity.comment_id;
    dto.comment_text = entity.comment_text;
    dto.comment_parent_id = entity.comment_parent_id;
    dto.summary_id = entity.summary_id;
    dto.user_id = entity.user_id;
    dto.created_at = entity.created_at;
    dto.updated_at = entity.updated_at;
    return dto;
  }

  static toDtoList(entities: any[]): CommentResponseDto[] {
    return entities.map(this.toDto);
  }
}