export const ERROR_MESSAGES: Record<string, string> = {
  // GLOBAL
  INVALID_REQUEST: '잘못된 요청입니다. 입력 정보를 확인해주세요.',
  ACCESS_DENIED: '접근이 거부되었습니다. 권한을 확인해주세요.',

  // AUTH → 개별 메시지 제거
  AUTH_RETRY_REQUIRED: '다시 로그인 해주세요.',

  // MEMBER
  DUPLICATE_USERNAME: '이미 가입된 이메일입니다.',
  MEMBER_NOT_FOUND: '해당 회원 정보를 찾을 수 없습니다.',
  INVALID_MEMBER_TYPE: '잘못된 회원 유형입니다.',

  // CONCERT
  CONCERT_NOT_FOUND: '해당 콘서트를 찾을 수 없습니다.',
  DUPLICATE_CONCERT_NAME: '이미 존재하는 콘서트명입니다.',
  INVALID_RANGE_REQUEST: '입력하신 범위가 올바르지 않습니다.',
  TICKET_OPEN_DATE_REQUIRED: '티켓 오픈일은 필수 정보입니다.',
  INVALID_TICKET_REQUEST_MAX_COUNT: '최대 티켓 요청 수가 올바르지 않습니다.',
  PRE_OPEN_COUNT_EXCEED: '선예매 오픈일은 최대 한 개만 등록할 수 있습니다.',
  GENERAL_OPEN_COUNT_EXCEED:
    '일반예매 오픈일은 최대 한 개만 등록할 수 있습니다.',
  CONCERT_DATE_REQUIRED: '공연일 정보는 필수 정보입니다',
  CONCERT_DATE_NOT_FOUND: '공연 날짜를 찾을 수 없습니다.',
  INVALID_CONCERT_DATE: '올바르지 않은 공연 날짜입니다.',
  DUPLICATE_CONCERT_DATE: '중복된 공연 날짜입니다.',
  TICKET_OPEN_DATE_NOT_FOUND: '티켓 오픈일을 찾을 수 없습니다.',
  TICKET_OPEN_TYPE_NOT_FOUND: '티켓 오픈 타입을 찾을 수 없습니다.',
  TICKET_REQUEST_COUNT_EXCEED: '티켓 요청 수가 제한을 초과했습니다.',

  // CONCERT_HALL
  CONCERT_HALL_NOT_FOUND: '공연장 정보를 찾을 수 없습니다.',
  DUPLICATE_CONCERT_HALL_NAME: '중복된 공연장 이름입니다.',
  CITY_NOT_FOUND: '주소에 맞는 도시 정보를 찾을 수 없습니다.',

  // FILE IO
  FILE_UPLOAD_ERROR: '파일 업로드 중 문제가 발생했습니다. 다시 시도해주세요.',

  // PORTFOLIO
  PORTFOLIO_NOT_FOUND: '포트폴리오를 찾을 수 없습니다.',
  PORTFOLIO_IMG_BLACK: '포트폴리오 이미지를 첨부해주세요.',
  PORTFOLIO_IMG_MAX_COUNT_EXCEEDED:
    '포트폴리오 이미지는 최대 20장까지 등록 가능합니다.',

  // APPLICATION_FORM
  APPLICATION_FORM_NOT_FOUND: '대리 티켓팅 신청서를 찾을 수 없습니다.',
  HOPE_AREAS_SIZE_EXCEED: '희망 구역은 최대 10개까지만 등록할 수 있습니다.',
  PRIORITY_ALREADY_EXISTS: '이미 설정된 우선순위입니다.',
  DUPLICATE_APPLICATION_FROM_REQUEST: '중복된 신청서 요청입니다.',
  ALREADY_APPROVED_APPLICATION_FROM: '이미 승인된 신청서입니다.',
  INVALID_APPLICATION_FORM_STATUS: '신청서 상태가 올바르지 않습니다.',
  APPLICATION_FORM_DETAIL_REQUIRED:
    '신청서에는 최소 한 개 이상의 공연일자가 포함되어야 합니다.',
  APPLICATION_FORM_DETAIL_NOT_FOUND: '신청서 상세 정보를 찾을 수 없습니다.',
  DUPLICATE_APPLICATION_FORM_DETAIL: '중복된 신청서 상세 내용입니다.',

  // EXPRESSIONS
  INVALID_MEMO_REQUEST: '거절 사유 메모는 최소 2글자 이상이어야 합니다.',

  // CHAT
  CHAT_ROOM_NOT_FOUND: '채팅방을 찾을 수 없습니다.',
};
