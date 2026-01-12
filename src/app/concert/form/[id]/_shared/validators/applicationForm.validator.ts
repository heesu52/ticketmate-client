import { FormData } from '@/app/concert/form/[id]/_shared/components/form-input/form-input.type';
import { ValidationConstants } from '@/shared/types/ValidationConstants';

export type ValidationResult =
  | { valid: true }
  | { valid: false; message: string; tabId?: number };

export const validateApplicationForm = (
  formData: Record<number, FormData>,
): ValidationResult => {
  for (const [tabId, data] of Object.entries(formData)) {
    const numericTabId = Number(tabId);

    if (!data.performanceDate) {
      return {
        valid: false,
        tabId: numericTabId,
        message: '회차를 선택해주세요.',
      };
    }

    if (
      !data.requestCount ||
      Number(data.requestCount) <
        ValidationConstants.ApplicationForm.APPLICATION_FORM_MIN_REQUEST_COUNT
    ) {
      return {
        valid: false,
        tabId: numericTabId,
        message: '매수를 선택해주세요.',
      };
    }

    if (
      data.requirement &&
      data.requirement.length >
        ValidationConstants.ApplicationForm.REQUIREMENT_MAX_LENGTH
    ) {
      return {
        valid: false,
        tabId: numericTabId,
        message: `요청사항은 최대 ${ValidationConstants.ApplicationForm.REQUIREMENT_MAX_LENGTH}자까지 입력 가능합니다.`,
      };
    }
  }

  return { valid: true };
};
