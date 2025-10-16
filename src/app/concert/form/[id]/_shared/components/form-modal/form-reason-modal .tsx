// 'use client';

// import { useEffect, useState } from 'react';

// import { useQuery } from '@tanstack/react-query';

// import { getRejectionReason } from '@/app/history/_shared/services/api';
// import ModalTemplate from '@/shared/components/ui/modal/modal-template/modal-template';
// import { ModalTemplateType } from '@/shared/components/ui/modal/modal-template/modal-template.type';
// import { ModalControl } from '@/shared/components/ui/modal/modal.type';
// import { toastify } from '@/shared/components/ui/toast/toastify';
// import { APPLICATION_REJECTED_LABEL_MAP } from '@/shared/constants/type-mapping';
// import { ApplicationRejectedType } from '@/shared/types';

// interface FormReasonModalProps extends ModalControl<unknown> {
//   applicationFormId: string;
// }

// interface GetRejectionReasonResponse {
//   applicationFormRejectedType: ApplicationRejectedType;
//   otherMemo: string;
// }

// const FormReasonModal = ({
//   onResolve,
//   onReject,
//   applicationFormId,
// }: FormReasonModalProps) => {
//   const { data, isError } = useQuery<GetRejectionReasonResponse>({
//     queryKey: ['rejectionReason', applicationFormId],
//     queryFn: () => getRejectionReason(applicationFormId),
//   });

//   useEffect(() => {
//     if (data) {
//       const mappedMessage =
//         APPLICATION_REJECTED_LABEL_MAP[data.applicationFormRejectedType];
//       const c = data.otherMemo;
//     } else if (isError) {
//       toastify({
//         variant: 'error',
//         description: '거절 사유 조회를 실패했습니다.',
//       });
//     }
//   }, [data, isError]);

//   const handleFirstButtonClick = () => {
//     onReject?.();
//   };

//   const handleSecondButtonClick = () => {
//     onResolve?.(true);
//   };

//   return (
//     <ModalTemplate
//       title="대리인 닉네임의 거절사유"
//       description={mappedMessage}
//       children={mappedMessage}
//       firstButtonLabel="확인했어요"
//       secondButtonLabel="신청하기"
//       onFirstButtonClick={handleFirstButtonClick}
//       onSecondButtonClick={handleSecondButtonClick}
//     />
//   );
// };

// export default FormReasonModal;
