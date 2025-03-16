import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto, GetCommentsBySummaryDto } from '../dtos/comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 댓글 생성
  async createComment(dto: CreateCommentDto & { summary_id: number, user_id: number }) {
    return this.prisma.comment.create({
      data: {
        comment_text: dto.comment_text,
        comment_parent_id: dto.comment_parent_id || 0,
        user: {
          connect: { user_id: dto.user_id }, 
        },
        summary: {
          connect: { summary_id: dto.summary_id }, 
        },
      },
    });
  }

  // 댓글 조회
  async findCommentById(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { comment_id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    return comment;
  }

  // 댓글 수정
  async updateComment(commentId: number, dto: UpdateCommentDto) {
    await this.findCommentById(commentId); // 존재하지 않으면 예외 발생

    return this.prisma.comment.update({
      where: { comment_id: commentId },
      data: { comment_text: dto.comment_text },
    });
  }

  // 댓글 삭제
  async deleteComment(commentId: number) {
    await this.findCommentById(commentId); // 존재하지 않으면 예외 발생

    return this.prisma.comment.delete({
      where: { comment_id: commentId },
    });
  }

  // Summary에 대한 댓글 목록 조회
  async findCommentsBySummary(dto: GetCommentsBySummaryDto) {
    return this.prisma.comment.findMany({
      where: { summary_id: dto.summary_id },
      orderBy: { created_at: 'desc' },
    });
  }
}