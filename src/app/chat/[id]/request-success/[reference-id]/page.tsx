'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import RequestSuccessCreate from '@/app/chat/[id]/request-success/[reference-id]/_shared/components/request-success/request-success-create/request-success-create';
import RequestSuccessDetail from '@/app/chat/[id]/request-success/[reference-id]/_shared/components/request-success/request-success-detail/request-success-detail';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

type PageMode = 'create' | 'view' | 'update';

const RequestSuccessPage = () => {
  const { 'reference-id': referenceId } = useParams();

  const [pageMode, setPageMode] = useState<PageMode>('create');

  useEffect(() => {
    if (referenceId === 'new') setPageMode('create');
    else setPageMode('view');
  }, [referenceId]);

  return (
    <PageFrame
      appBar={{
        title:
          pageMode === 'create'
            ? '의뢰 성공요청'
            : pageMode === 'view'
              ? '의뢰 성공 상세보기'
              : '의뢰 성공요청',
        showBack: true,
      }}
      bottomNav={false}
    >
      {pageMode === 'create' && <RequestSuccessCreate />}
      {(pageMode === 'view' || pageMode === 'update') && (
        <RequestSuccessDetail pageMode={pageMode} setPageMode={setPageMode} />
      )}
    </PageFrame>
  );
};

export default RequestSuccessPage;
