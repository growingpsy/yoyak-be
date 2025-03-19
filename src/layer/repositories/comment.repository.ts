import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 댓글 생성 (대댓글 포함)
  async createComment(dto: CreateCommentDto & { summary_id: number, user_id: number }) {
    return this.prisma.comment.create({
      data: {
        comment_text: dto.comment_text,
        comment_parent_id: dto.comment_parent_id ?? null, // 대댓글이면 부모 ID, 아니면 null
        summary: { connect: { summary_id: dto.summary_id } }, // Summary 연결
        user: { connect: { user_id: dto.user_id } }, // ✅ user 연결 추가 (누락된 부분)
      },
    });
  }

  // 댓글 단일 조회 (대댓글 포함)
  async findCommentById(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { comment_id: commentId },
      include: { replies: true, user: true },
    });

    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    return comment;
  }

  // 댓글 수정
  async updateComment(commentId: number, dto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { comment_id: commentId },
      data: { comment_text: dto.comment_text },
      include: { user: true },
    });
  }

  // 댓글 삭제 (부모 댓글 "삭제된 댓글입니다."로 변경, 대댓글 유지)
  async deleteComment(commentId: number) {
    return this.prisma.comment.update({
      where: { comment_id: commentId },
      data: { comment_text: '댓글이 삭제되었습니다' },
    });
  }

  // Summary에 대한 모든 댓글 조회 (트리 구조)
  async findCommentsBySummary(summary_id: number) {
    const comments = await this.prisma.comment.findMany({
      where: { summary_id },
      include: {
        replies: {
          include: { replies: true },
        },
        user: true,
      },
      orderBy: { created_at: 'asc' },
    });

    return this.buildCommentTree(comments);
  }

  // 트리 구조 변환
  private buildCommentTree(comments: any[]) {
    const commentMap = new Map();
    const rootComments: any[] = [];

    comments.forEach(comment => {
      comment.replies = [];
      commentMap.set(comment.comment_id, comment);
    });

    comments.forEach(comment => {
      if (comment.comment_parent_id) {
        const parent = commentMap.get(comment.comment_parent_id);
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  }
}