export const ERROR_MESSAGES: Record<string, string> = {
  // AUTH → 개별 메시지 제거
  AUTH_RETRY_REQUIRED: '다시 로그인 해주세요.',

  // MEMBER
  DUPLICATE_USERNAME: '이미 가입된 이메일입니다.',
  MEMBER_NOT_FOUND: '회원을 찾을 수 없습니다.',
  INVALID_MEMBER_TYPE: '회원을 찾을 수 없습니다.',

  // CONCERT
  CONCERT_NOT_FOUND: '해당 공연을 찾을 수 없습니다.',
  DUPLICATE_CONCERT_NAME: '중복된 공연 이름입니다.',
  INVALID_RANGE_REQUEST: '입력하신 범위를 다시 확인해주세요.',
  TICKET_OPEN_DATE_REQUIRED: '티켓 오픈일을 작성해주세요.',
  INVALID_TICKET_REQUEST_MAX_COUNT: '티켓 요청 수량을 다시 확인해주세요.',
  PRE_OPEN_COUNT_EXCEED: '선예매 오픈일은 최대 한 개만 등록할 수 있습니다.',
  GENERAL_OPEN_COUNT_EXCEED:
    '일반예매 오픈일은 최대 한 개만 등록할 수 있습니다.',
  CONCERT_DATE_REQUIRED: '공연일 정보를 작성해주세요.',
  CONCERT_DATE_NOT_FOUND: '해당 공연 날짜를 찾을 수 없습니다.',
  INVALID_CONCERT_DATE: '공연 날짜를 다시 입력해주세요.',
  DUPLICATE_CONCERT_DATE: '중복된 공연 날짜입니다.',
  TICKET_OPEN_DATE_NOT_FOUND: '해당 티켓 오픈일을 찾을 수 없습니다.',
  TICKET_OPEN_TYPE_NOT_FOUND: '해당 티켓 오픈 유형을 찾을 수 없습니다.',
  TICKET_REQUEST_COUNT_EXCEED: '요청 가능한 매수를 초과했습니다.',

  // CONCERT_HALL
  CONCERT_HALL_NOT_FOUND: '해당 공연장을 찾을 수 없습니다.',
  DUPLICATE_CONCERT_HALL_NAME: '중복된 공연장 이름입니다.',
  CITY_NOT_FOUND: '해당 도시를 찾을 수 없습니다.',

  // FILE IO
  FILE_UPLOAD_ERROR: '파일 업로드 중 문제가 발생했습니다. 다시 시도해주세요.',

  // PORTFOLIO
  PORTFOLIO_NOT_FOUND: '포트폴리오를 찾을 수 없습니다.',
  PORTFOLIO_IMG_BLACK: '포트폴리오 이미지를 첨부해주세요.',
  PORTFOLIO_IMG_MAX_COUNT_EXCEEDED:
    '포트폴리오 이미지는 최대 20장까지 등록 가능합니다.',

  // APPLICATION_FORM
  APPLICATION_FORM_NOT_FOUND: '해당 신청서를 찾을 수 없습니다.',
  HOPE_AREAS_SIZE_EXCEED: '희망 구역은 최대 10개까지만 등록할 수 있습니다.',
  PRIORITY_ALREADY_EXISTS: '이미 설정된 우선순위입니다.',
  DUPLICATE_APPLICATION_FROM_REQUEST: '이미 작성된 신청서입니다.',
  ALREADY_APPROVED_APPLICATION_FROM: '이미 승인된 신청서입니다.',
  INVALID_APPLICATION_FORM_STATUS: '신청서를 다시 작성해주세요.',
  APPLICATION_FORM_DETAIL_REQUIRED:
    '신청서에는 최소 한 개 이상의 공연일자가 포함되어야 합니다.',
  APPLICATION_FORM_DETAIL_NOT_FOUND: '신청서 상세 정보를 찾을 수 없습니다.',
  DUPLICATE_APPLICATION_FORM_DETAIL: '중복된 신청서 상세 내용입니다.',

  // EXPRESSIONS
  INVALID_MEMO_REQUEST: '최소 10글자 이상 작성해주세요',

  // CHAT
  CHAT_ROOM_NOT_FOUND: '해당 채팅방을 찾을 수 없습니다.',
};
