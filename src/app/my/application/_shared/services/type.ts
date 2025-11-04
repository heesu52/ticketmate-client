interface CreateAgentAvailabilityRequest {
  concertId: string; //공연 식별자 [필수]
  accepting: boolean; // 수락 여부 [선택 (누락 시 true)]
  introduction: string; //소개 문구 [선택]
}

export type { CreateAgentAvailabilityRequest };
