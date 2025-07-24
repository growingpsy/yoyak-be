import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommentRepository } from '../repositories/comment.repository';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly prisma: PrismaService,
  ) {}

  // 댓글 생성
  async createComment(summaryId: number, dto: CreateCommentDto, userId: number) {
    const summary = await this.prisma.summary.findUnique({
      where: { summary_id: summaryId },
    });

    if (!summary) {
      throw new NotFoundException('Summary를 찾을 수 없습니다.');
    }

    // 대댓글인 경우 부모 댓글이 존재하는지 확인
    if (dto.comment_parent_id) {
      const parentComment = await this.commentRepository.findCommentById(dto.comment_parent_id);
      
      // 부모 댓글이 해당 summary에 속하는지 확인
      if (parentComment.summary_id !== summaryId) {
        throw new NotFoundException('해당 Summary에 속한 부모 댓글이 아닙니다.');
      }
    }

    return this.commentRepository.createComment({
      ...dto,
      summary_id: summaryId,
      user_id: userId,
    });
  }

  // 댓글 수정
  async updateComment(summaryId: number, commentId: number, dto: UpdateCommentDto, userId: number) {
    const comment = await this.commentRepository.findCommentById(commentId);

    if (comment.summary_id !== summaryId) {
      throw new NotFoundException('Summary에 해당하는 댓글을 찾을 수 없습니다.');
    }

    if (comment.user_id !== userId) {
      throw new UnauthorizedException('본인의 댓글만 수정할 수 있습니다.');
    }

    // 이미 삭제 표시된 댓글인지 확인
    const isDeleted = await this.commentRepository.isDeletedComment(commentId);
    if (isDeleted) {
      throw new NotFoundException('이미 삭제된 댓글은 수정할 수 없습니다.');
    }

    return await this.commentRepository.updateComment(commentId, dto);
  }

  // 댓글 삭제
  async deleteComment(summaryId: number, commentId: number, userId: number) {
    const comment = await this.commentRepository.findCommentById(commentId);

    if (comment.summary_id !== summaryId) {
      throw new NotFoundException('Summary에 해당하는 댓글을 찾을 수 없습니다.');
    }

    if (comment.user_id !== userId) {
      throw new UnauthorizedException('본인의 댓글만 삭제할 수 있습니다.');
    }

    return await this.commentRepository.deleteComment(commentId);
  }

  // Summary에 대한 댓글 목록 조회
  async getCommentsBySummary(summaryId: number) {
    return await this.commentRepository.findCommentsBySummary({ summary_id: summaryId });
  }
}