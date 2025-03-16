import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Get,
    Delete,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { CommentService } from '../services/comment.service';
  import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { AuthGuard } from '@nestjs/passport';
  import { ResponseDto } from '../dtos/response.dto';
  
  @ApiTags('comments')
  @ApiBearerAuth('access-token')
  @Controller('summaries/:summary_id/comments')
  export class CommentController {
    constructor(private readonly commentService: CommentService) {}
  
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @ApiOperation({ summary: '댓글 생성' })
    @ApiResponse({ status: 201, description: '댓글 생성 성공', type: Object })
    async createComment(
      @Param('summary_id') summaryId: string,
      @Body() dto: CreateCommentDto,
      @Req() req,
    ) {
      const comment = await this.commentService.createComment(Number(summaryId), dto, req.user.user_id);
      return new ResponseDto(201, '댓글 생성 성공', comment);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Patch(':comment_id')
    @ApiOperation({ summary: '댓글 수정' })
    @ApiResponse({ status: 200, description: '댓글 수정 성공', type: Object })
    async updateComment(
      @Param('summary_id') summaryId: string,
      @Param('comment_id') commentId: string,
      @Body() dto: UpdateCommentDto,
      @Req() req,
    ) {
      const updatedComment = await this.commentService.updateComment(Number(summaryId), Number(commentId), dto, req.user.user_id);
      return new ResponseDto(200, '댓글 수정 성공', updatedComment);
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Delete(':comment_id')
    @ApiOperation({ summary: '댓글 삭제' })
    @ApiResponse({ status: 200, description: '댓글 삭제 성공', type: Object })
    async deleteComment(
      @Param('summary_id') summaryId: string,
      @Param('comment_id') commentId: string,
      @Req() req,
    ) {
      await this.commentService.deleteComment(Number(summaryId), Number(commentId), req.user.user_id);
      return new ResponseDto(200, '댓글 삭제 성공');
    }
  
    @Get()
    @ApiOperation({ summary: 'Summary에 대한 모든 댓글 조회' })
    @ApiResponse({ status: 200, description: '댓글 목록 조회 성공', type: [Object] })
    async getCommentsBySummary(@Param('summary_id') summaryId: string) {
      const comments = await this.commentService.getCommentsBySummary(Number(summaryId));
      return new ResponseDto(200, '댓글 목록 조회 성공', comments);
    }
  }