interface AgentInfo {
  agentId: string; // UUID
  nickname: string;
  profileUrl: string;
  introduction: string; // 없으면 빈 문자열
  averageRating: number;
  reviewCount: number;
  score: number;
}

export type { AgentInfo };
