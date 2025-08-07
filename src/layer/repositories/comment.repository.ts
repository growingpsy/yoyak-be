// src/modules/comment/repositories/comment.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentDto & { summary_id: number; user_id: number }) {
    const newComment = await this.prisma.comment.create({
      data: {
        comment_text: data.comment_text,
        comment_parent_id: data.comment_parent_id ?? null,
        summary_id: data.summary_id,
        user_id: data.user_id,
      },
    });

    return this.findOne(newComment.comment_id); // 👉 생성 직후 상세 조회 (user, replies 포함)
  }

  async findOne(comment_id: number) {
    return this.prisma.comment.findUnique({
      where: { comment_id },
      include: {
        user: { select: { user_nick: true } },
        replies: {
          orderBy: { created_at: 'asc' },
          include: {
            user: { select: { user_nick: true } },
          },
        },
      },
    });
  }

  async update(comment_id: number, data: UpdateCommentDto) {
    await this.prisma.comment.update({
      where: { comment_id },
      data: { comment_text: data.comment_text },
    });

    return this.findOne(comment_id); // 👉 업데이트 후 상세 조회 리턴
  }

  async delete(comment_id: number) {
    const comment = await this.findOne(comment_id);

    if (comment?.replies && comment.replies.length > 0) {
      await this.prisma.comment.update({
        where: { comment_id },
        data: { comment_text: '삭제된 댓글입니다.' },
      });
      return this.findOne(comment_id); // 👉 soft delete 후 상세 조회
    } else {
      await this.prisma.comment.delete({ where: { comment_id } });
      return null; // 👉 hard delete한 경우 null
    }
  }

  async findBySummary(summary_id: number) {
    return this.prisma.comment.findMany({
      where: {
        summary_id,
        comment_parent_id: null,
      },
      orderBy: { created_at: 'asc' },
      include: {
        replies: {
          orderBy: { created_at: 'asc' },
          include: {
            user: { select: { user_nick: true } },
          },
        },
        user: { select: { user_nick: true } },
      },
    });
  }

  async isDeleted(comment_id: number): Promise<boolean> {
    const comment = await this.prisma.comment.findUnique({
      where: { comment_id },
      select: { comment_text: true },
    });

    return comment?.comment_text === '삭제된 댓글입니다.';
  }
}