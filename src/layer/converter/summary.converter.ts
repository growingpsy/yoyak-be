// src/converters/summary.converter.ts
import { SummaryResponseDto } from '../dtos/summary.dto';

export class SummaryConverter {
  static toDto(entity: any): SummaryResponseDto {
    const dto = new SummaryResponseDto();
    dto.summary_id = entity.summary_id;
    dto.summary_text = entity.summary_text;
    dto.summary_title = entity.summary_title;
    dto.summary_episode = entity.summary_episode;
    dto.is_long = entity.is_long;
    dto.contains_spoiler = entity.contains_spoiler;
    dto.content_id = entity.content_id;
    dto.user_id = entity.user_id;
    dto.created_at = entity.created_at;
    dto.updated_at = entity.updated_at;
    return dto;
  }

  static toDtoList(entities: any[]): SummaryResponseDto[] {
    return entities.map(this.toDto);
  }
}
