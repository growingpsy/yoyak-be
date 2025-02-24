import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SummaryModel {
  // 새로운 요약 생성
  async createSummary(data: {
    summary_text: string;
    is_long: boolean;
    contains_spoiler: boolean;
    content_id: bigint;
    user_id: bigint;
  }) {
    return prisma.summary.create({
      data: {
        summary_text: data.summary_text,
        is_long: data.is_long,
        contains_spoiler: data.contains_spoiler,
        content_id: data.content_id,
        user_id: data.user_id,
      },
    });
  }

  // 특정 요약 조회
  async getSummary(summaryId: bigint) {
    return prisma.summary.findUnique({
      where: { summary_id: summaryId },
    });
  }

  // 모든 요약 조회
  async getAllSummaries() {
    return prisma.summary.findMany();
  }

  // 요약 수정
  async updateSummary(summaryId: bigint, updateData: Partial<{ summary_text: string; is_long: boolean; contains_spoiler: boolean }>) {
    return prisma.summary.update({
      where: { summary_id: summaryId },
      data: updateData,
    });
  }

  // 요약 삭제
  async deleteSummary(summaryId: bigint) {
    return prisma.summary.delete({
      where: { summary_id: summaryId },
    });
  }
}
