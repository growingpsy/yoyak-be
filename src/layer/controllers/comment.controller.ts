import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CommentService } from '../services/comment.service';
import {
  CreateCommentDto,
  UpdateCommentDto,
} from '../dtos/comment.dto';
import { ResponseDto } from '../dtos/response.dto';
import { CurrentUser } from '../strategies/current-user.decorator';

@ApiTags('Comments')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('summaries/:summary_id/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: '댓글 생성' })
  @ApiResponse({
    status: 201,
    description: '댓글 생성 성공',
    schema: {
      example: {
        status: 201,
        message: '댓글 생성 성공',
        data: {
          comment_id: 14,
          comment_parent_id: null,
          comment_text: '정말 유익한 요약이네요!',
          created_at: '2025-08-07T19:48:14.000Z',
          updated_at: '2025-08-07T19:48:14.000Z',
          summary_id: 1,
          user_id: 9,
          user: {
            user_nick: 'yoyakswuni',
          },
          replies: [],
        },
      },
    },
  })
  async create(
    @Param('summary_id') summaryId: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: { user_id: number },
  ) {
    const comment = await this.commentService.create(
      Number(summaryId),
      dto,
      user.user_id,
    );
    return new ResponseDto(201, '댓글 생성 성공', comment);
  }

  @Patch(':comment_id')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiResponse({
    status: 200,
    description: '댓글 수정 성공',
    schema: {
      example: {
        status: 200,
        message: '댓글 수정 성공',
        data: {
          comment_id: 1,
          comment_text: '수정된 댓글입니다.',
          comment_parent_id: null,
          user_id: 9,
          summary_id: 1,
          created_at: '2025-08-07T18:17:06.000Z',
          updated_at: '2025-08-08T02:00:00.000Z',
          user: {
            user_nick: 'yoyakswuni',
          },
          replies: [],
        },
      },
    },
  })
  async update(
    @Param('summary_id') summaryId: string,
    @Param('comment_id') commentId: string,
    @Body() dto: UpdateCommentDto,
    @CurrentUser() user: { user_id: number },
  ) {
    const updatedComment = await this.commentService.update(
      Number(summaryId),
      Number(commentId),
      dto,
      user.user_id,
    );
    return new ResponseDto(200, '댓글 수정 성공', updatedComment);
  }

  @Delete(':comment_id')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiResponse({
    status: 200,
    description: '댓글 삭제 성공',
    schema: {
      example: {
        status: 200,
        message: '댓글 삭제 성공',
        data: null,
      },
    },
  })
  async delete(
    @Param('summary_id') summaryId: string,
    @Param('comment_id') commentId: string,
    @CurrentUser() user: { user_id: number },
  ) {
    await this.commentService.delete(
      Number(summaryId),
      Number(commentId),
      user.user_id,
    );
    return new ResponseDto(200, '댓글 삭제 성공');
  }

  @Get()
  @ApiOperation({ summary: 'Summary에 대한 모든 댓글 조회' })
  @ApiResponse({
    status: 200,
    description: '댓글 목록 조회 성공',
    schema: {
      example: {
        status: 200,
        message: '댓글 목록 조회 성공',
        data: [
          {
            comment_id: 1,
            comment_parent_id: null,
            comment_text: '삭제된 댓글입니다.',
            created_at: '2025-08-07T18:17:06.000Z',
            updated_at: '2025-08-07T18:17:06.000Z',
            summary_id: 1,
            user_id: 9,
            replies: [
              {
                comment_id: 4,
                comment_parent_id: 1,
                comment_text: '잘봤습니다!',
                created_at: '2025-08-07T19:04:43.000Z',
                updated_at: '2025-08-07T19:04:43.000Z',
                summary_id: 1,
                user_id: 9,
                user: {
                  user_nick: 'yoyakswuni',
                },
              },
              {
                comment_id: 5,
                comment_parent_id: 1,
                comment_text: '좋아요!',
                created_at: '2025-08-07T19:30:48.000Z',
                updated_at: '2025-08-07T19:30:48.000Z',
                summary_id: 1,
                user_id: 9,
                user: {
                  user_nick: 'yoyakswuni',
                },
              },
              {
                comment_id: 6,
                comment_parent_id: 1,
                comment_text: '수정된 댓글입니다.',
                created_at: '2025-08-07T19:33:27.000Z',
                updated_at: '2025-08-07T19:33:27.000Z',
                summary_id: 1,
                user_id: 9,
                user: {
                  user_nick: 'yoyakswuni',
                },
              },
            ],
            user: {
              user_nick: 'yoyakswuni',
            },
          },
        ],
      },
    },
  })
  async findBySummary(@Param('summary_id') summaryId: string) {
    const comments = await this.commentService.findBySummary(Number(summaryId));
    return new ResponseDto(200, '댓글 목록 조회 성공', comments);
  }
}