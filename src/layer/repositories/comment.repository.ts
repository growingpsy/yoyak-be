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
      comment_parent_id: dto.comment_parent_id || null,
      summary_id: dto.summary_id,
      user_id: dto.user_id,
    },
  });
}

  // 댓글 조회
  async findCommentById(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { comment_id: commentId },
      include: { replies: true },
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

    // 댓글 삭제 (수정됨 - 대댓글이 있는 경우 텍스트만 변경)
    async deleteComment(commentId: number) {
      const comment = await this.findCommentById(commentId);
      
      // 대댓글이 있는지 확인
      const hasReplies = comment.replies && comment.replies.length > 0;
      
      if (hasReplies) {
        // 대댓글이 있으면 텍스트만 변경
        return this.prisma.comment.update({
          where: { comment_id: commentId },
          data: { comment_text: "삭제된 댓글입니다." },
        });
      } else {
        // 대댓글이 없으면 완전히 삭제
        return this.prisma.comment.delete({
          where: { comment_id: commentId },
        });
      }
    }
  
    // Summary에 대한 댓글 목록 조회
    async findCommentsBySummary(dto: GetCommentsBySummaryDto) {
      // 최상위 댓글만 가져옴 (comment_parent_id가 null인 것)
      const rootComments = await this.prisma.comment.findMany({
        where: { 
          summary_id: dto.summary_id,
          comment_parent_id: null
        },
        orderBy: { created_at: 'asc' },
        include: {
          // 대댓글도 함께 가져옴
          replies: {
            orderBy: { created_at: 'asc' },
            include: {
              user: {
                select: {
                  user_nick: true
                }
              }
            }
          },
          user: {
            select: {
              user_nick: true
            }
          }
        },
      });
      
      return rootComments;
    }
    
    // 삭제된 댓글인지 확인 (텍스트로 판단)
    async isDeletedComment(commentId: number): Promise<boolean> {
      const comment = await this.prisma.comment.findUnique({
        where: { comment_id: commentId },
        select: { comment_text: true }
      });
      
      return comment?.comment_text === "삭제된 댓글입니다.";
    }
  }