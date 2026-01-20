export const VALIDATION_CONSTANTS = {
  Member: {
    // 닉네임 제약조건
    NICKNAME_MIN_LENGTH: 2,
    NICKNAME_MAX_LENGTH: 12,

    // 전화번호 제약조건
    PHONE_MAX_LENGTH: 13, // +8212345678 (E.164 형식)

    // 생일 및 출생연도 제약조건
    BIRTHDAY_LENGTH: 4, // MMDD
    BIRTHYEAR_LENGTH: 4, // YYYY

    // 자기소개 제약조건
    INTRODUCTION_MAX_LENGTH: 50,
  },

  ApplicationForm: {
    // 우선순위 제약조건
    PRIORITY_MIN_VALUE: 1,
    PRIORITY_MAX_VALUE: 5,

    // 요청 매수 제약조건
    APPLICATION_FORM_MIN_REQUEST_COUNT: 1,
    APPLICATION_FORM_MAX_REQUEST_COUNT: 10,

    // 요청 사항 최대 길이
    REQUIREMENT_MAX_LENGTH: 100,

    // 희망구역 최대 개수
    HOPE_AREA_MAX_SIZE: 5,
  },

  Portfolio: {
    // 포트폴리오 글자 수 제약조건
    PORTFOLIO_DESCRIPTION_MIN_LENGTH: 20,
    PORTFOLIO_DESCRIPTION_MAX_LENGTH: 200,

    // 포트폴리오 이미지 제약조건
    PORTFOLIO_IMG_MIN_COUNT: 1,
    PORTFOLIO_IMG_MAX_COUNT: 20,
  },

  Chat: {
    CHAT_MESSAGE_MAX_LENGTH: 500,
    CHAT_IMG_MAX_COUNT: 3,

    SEARCH_KEYWORD_MAX_LENGTH: 30,
  },

  Search: {
    KEYWORD_MAX_LENGTH: 20,
  },

  AgentBankAccount: {
    MAX_ACCOUNT_COUNT: 5,
    MAX_ACCOUNT_HOLDER_LENGTH: 20,
  },

  MemberWithdrawal: {
    WITHDRAW_BLOCK_DURATION_DAYS: 30, // Duration.ofDays(30)
    WITHDRAW_OTHER_REASON_MAX_LENGTH: 20,
  },

  FullfillmentForm: {
    // 성공 사진 이미지 최대 개수
    FULLFILLMENT_IMG_MAX_COUNT: 6,
    // 상세 설명 최대 길이
    PARTICULAR_MEMO_MAX_LENGTH: 100,
    // 거절 사유 최대 길이
    REJECTED_MEMO_MAX_LENGTH: 100,
  },

  Review: {
    REVIEW_IMG_MAX_COUNT: 3,

    COMMENT_MIN_LENGTH: 10,
    COMMENT_MAX_LENGTH: 300,

    RATING_MIN: 0.0,
    RATING_MAX: 5.0,
  },
} as const;
