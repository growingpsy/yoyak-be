// src/modules/comment/services/comment.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(summary_id: number, dto: CreateCommentDto, user_id: number) {
    const summary = await this.prisma.summary.findUnique({
      where: { summary_id },
    });

    if (!summary) {
      throw new NotFoundException(`Summary ID ${summary_id}가 존재하지 않습니다.`);
    }

    if (dto.comment_parent_id) {
      const parent = await this.commentRepository.findOne(dto.comment_parent_id);
      if (!parent || parent.summary_id !== summary_id) {
        throw new NotFoundException(`해당 Summary에 속한 부모 댓글이 아닙니다.`);
      }
    }

    return this.commentRepository.create({
      ...dto,
      summary_id,
      user_id,
    });
  }

  async update(
    summary_id: number,
    comment_id: number,
    dto: UpdateCommentDto,
    user_id: number,
  ) {
    const comment = await this.commentRepository.findOne(comment_id);

    if (!comment || comment.summary_id !== summary_id) {
      throw new NotFoundException(`Summary에 해당하는 댓글을 찾을 수 없습니다.`);
    }

    if (comment.user_id !== user_id) {
      throw new ForbiddenException('본인의 댓글만 수정할 수 있습니다.');
    }

    const isDeleted = await this.commentRepository.isDeleted(comment_id);
    if (isDeleted) {
      throw new NotFoundException('이미 삭제된 댓글은 수정할 수 없습니다.');
    }

    return this.commentRepository.update(comment_id, dto);
  }

  async delete(summary_id: number, comment_id: number, user_id: number) {
    const comment = await this.commentRepository.findOne(comment_id);

    if (!comment || comment.summary_id !== summary_id) {
      throw new NotFoundException(`Summary에 해당하는 댓글을 찾을 수 없습니다.`);
    }

    if (comment.user_id !== user_id) {
      throw new ForbiddenException('본인의 댓글만 삭제할 수 있습니다.');
    }

    return this.commentRepository.delete(comment_id);
  }

  async findBySummary(summary_id: number) {
    return this.commentRepository.findBySummary(summary_id);
  }
}
