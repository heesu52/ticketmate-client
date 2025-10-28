// src/constants/error-messages.ts

export const ERROR_MESSAGES = {
  // GLOBAL
  INVALID_REQUEST: '잘못된 요청입니다.',
  ACCESS_DENIED: '접근이 거부되었습니다.',

  // AUTH
  AUTH_RETRY_REQUIRED: '다시 로그인 해주세요.',
  // ADMIN
  ADMIN_MEMBER_NOT_FOUND: '관리자 계정을 찾을 수 없습니다.',

  // OAUTH2
  INVALID_SOCIAL_PLATFORM: '잘못된 소셜 플랫폼 요청입니다.',
  INVALID_REDIRECT_URI: '유효하지 않은 리다이렉트 URI입니다.',

  // MEMBER
  DUPLICATE_USERNAME: '이미 가입된 이메일입니다.',
  MEMBER_NOT_FOUND: '회원을 찾을 수 없습니다.',
  INVALID_MEMBER_TYPE: '잘못된 회원 자격입니다.',
  INVALID_MEMBER_ROLE_REQUEST: '잘못된 회원 권한 요청입니다.',

  // MEMBER FOLLOW
  SELF_FOLLOW_NOT_ALLOWED: '자기 자신은 팔로우할 수 없습니다.',
  CLIENT_FOLLOW_AGENT_ONLY: '의뢰인만 대리인을 팔로우할 수 있습니다.',
  DUPLICATE_FOLLOW_NOT_ALLOWED: '이미 팔로우한 회원입니다.',
  UNFOLLOW_NOT_ALLOWED: '팔로우하지 않은 회원에게 언팔로우할 수 없습니다.',

  // CONCERT
  CONCERT_NOT_FOUND: '콘서트를 찾을 수 없습니다.',
  DUPLICATE_CONCERT_NAME: '중복된 공연 제목입니다.',
  INVALID_RANGE_REQUEST: '잘못된 범위가 입력되었습니다.',
  TICKET_OPEN_DATE_REQUIRED: '티켓 오픈일은 필수로 포함되어야 합니다.',
  INVALID_TICKET_REQUEST_MAX_COUNT: '티켓 최대 요청 개수가 잘못되었습니다.',
  PRE_OPEN_COUNT_EXCEED: '선예매 오픈일은 최대 한 개까지만 등록 가능합니다.',
  GENERAL_OPEN_COUNT_EXCEED:
    '일반예매 오픈일은 최대 한 개까지만 등록 가능합니다.',
  CONCERT_DATE_REQUIRED: '공연일 데이터는 필수입니다.',
  CONCERT_DATE_NOT_FOUND: '공연 날짜 정보를 찾을 수 없습니다.',
  INVALID_CONCERT_DATE: '잘못된 공연일자입니다.',
  DUPLICATE_CONCERT_DATE: '중복된 공연일자입니다.',
  TICKET_OPEN_DATE_NOT_FOUND: '티켓 오픈일을 찾을 수 없습니다.',
  INVALID_TICKET_OPEN_DATE: '잘못된 티켓 오픈일입니다.',
  TICKET_OPEN_TYPE_NOT_FOUND: '티켓 오픈 타입을 찾을 수 없습니다.',
  TICKET_REQUEST_COUNT_EXCEED: '티켓 예매 요청 매수가 초과되었습니다.',

  // CONCERT_HALL
  CONCERT_HALL_NOT_FOUND: '공연장을 찾을 수 없습니다.',
  DUPLICATE_CONCERT_HALL_NAME: '중복된 공연장 이름입니다.',
  DUPLICATE_WEB_SITE_URL: '중복된 웹사이트 URL입니다.',

  // PORTFOLIO
  PORTFOLIO_UPLOAD_ERROR: '포트폴리오 업로드에 실패했습니다.',
  PORTFOLIO_NOT_FOUND: '해당 포트폴리오를 찾을 수 없습니다.',
  INVALID_PORTFOLIO_IMG_COUNT:
    '포트폴리오 이미지 개수는 최소 1개, 최대 20개까지 가능합니다.',
  INVALID_PORTFOLIO_STATUS: '유효하지 않은 포트폴리오 상태입니다.',
  PORTFOLIO_IMG_COUNT_EXCEED: '포트폴리오 이미지 최대 개수를 초과했습니다.',
  PORTFOLIO_STATUS_TRANSITION_ERROR: '포트폴리오 상태를 변경할 수 없습니다.',

  // APPLICATION_FORM
  APPLICATION_FORM_NOT_FOUND: '대리 티켓팅 신청서를 찾을 수 없습니다.',
  HOPE_AREAS_SIZE_EXCEED: '회망구역은 최대 5개까지만 등록 가능합니다.',
  PRIORITY_ALREADY_EXISTS: '요청한 순위가 이미 설정되어있습니다.',
  DUPLICATE_APPLICATION_FROM_REQUEST: '중복된 신청서 요청입니다.',
  ALREADY_ACCEPTED_APPLICATION_FROM: '이미 수락된 신청서입니다.',
  INVALID_APPLICATION_FORM_STATUS: '잘못된 신청서 상태입니다.',
  APPLICATION_FORM_DETAIL_REQUIRED:
    '신청서에는 최소 1개 이상의 공연일자가 포함되어야 합니다.',
  APPLICATION_FORM_DETAIL_NOT_FOUND: '신청서 세부사항을 찾을 수 없습니다.',
  DUPLICATE_APPLICATION_FORM_DETAIL: '중복된 신청서 세부사항입니다.',
  APPLICATION_FORM_REQUIREMENT_LENGTH_EXCEED:
    '요청사항 최대 글자 수 50자를 초과했습니다.',

  // REJECTION_REASON
  INVALID_MEMO_REQUEST: '거절사유 메모는 최소 2글자 이상이어야 합니다.',
  REJECTION_REASON_NOT_FOUND: '신청서의 거절 사유를 찾을 수 없습니다.',

  // CHAT
  CHAT_ROOM_NOT_FOUND: '채팅방을 찾지 못했습니다.',
  ALREADY_EXIST_CHAT_ROOM: '해당 조건의 채팅방이 이미 존재합니다.',
  MESSAGE_NOT_FOUND: '메시지를 찾을 수 없습니다.',
  NO_AUTH_TO_ROOM: '채팅방 접근 권한이 없습니다.',
  CHAT_PICTURE_EMPTY: '전송할 이미지가 없습니다.',
  CHAT_PICTURE_SIZE_EXCEED: '채팅 이미지는 최대 10장까지 가능합니다.',
  CHAT_MESSAGE_ERROR: '메시지 전송 중 오류가 발생했습니다.',

  // SEARCH
  INVALID_SEARCH_TYPE: '잘못된 검색 타입입니다.',

  // JACKSON
  INVALID_DATE_TIME_PARSE: '날짜/시간 형식이 올바르지 않습니다.',

  // REPORT
  REPORT_NOT_FOUND: '신고 내역을 찾을 수 없습니다.',
  INVALID_REPORT_REASON: '유효하지 않은 신고 사유입니다.',
  SELF_REPORT_NOT_ALLOWED: '자기 자신을 신고할 수 없습니다.',
  REPORT_STATUS_TRANSITION_ERROR: '신고 상태를 변경할 수 없습니다.',

  // REVIEW
  NO_AUTH_TO_REVIEW: '리뷰 작성 권한이 없습니다.',
  NO_AUTH_TO_REVIEW_COMMENT: '리뷰 댓글 작성 권한이 없습니다.',
  CANNOT_REVIEW_NOT_SUCCEEDED_FORM:
    '성공한 신청서에 대해서만 리뷰 작성이 가능합니다.',
  REVIEW_ALREADY_EXISTS: '해당 신청서 리뷰가 이미 존재합니다.',
  IMAGE_UPLOAD_LIMIT_EXCEEDED: '리뷰 이미지는 최대 3개까지 등록 가능합니다.',
  REVIEW_NOT_FOUND: '리뷰를 찾을 수 없습니다.',
  REVIEW_EDIT_PERIOD_EXPIRED: '리뷰 수정 가능 기간이 지났습니다.',
  REVIEW_SAVE_ERROR: '리뷰 등록 중 오류가 발생했습니다.',

  // ACCOUNT
  INVALID_ACCOUNT_NUMBER: '올바르지 않은 계좌번호 양식입니다.',
  ACCOUNT_EXCEED: '계좌는 최대 5개까지 생성 가능합니다.',
  BANK_ACCOUNT_NOT_FOUND: '계좌를 찾을 수 없습니다.',
  BANK_ACCOUNT_NOT_OWNED: '계좌의 소유자가 아닙니다.',
  PRIMARY_CHANGE_REQUIRES_MULTIPLE_ACCOUNTS:
    '대표계좌 변경은 최소 2개 이상의 계좌가 필요합니다.',
  INVALID_ACCOUNT_HOLDER: '올바르지 않은 예금주 양식입니다.',
  INVALID_BANK_CODE: '올바르지 않은 은행 코드입니다.',
} as const;

export type ErrorCodeKey = keyof typeof ERROR_MESSAGES;
