import RequestSuccessForm from '@/app/chat/[id]/request-success/[reference-id]/_shared/components/request-success-form/request-success-form';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';

const RequestSuccessPage = () => {
  return (
    <PageFrame
      appBar={{
        title: '의뢰 성공요청',
        showBack: true,
      }}
      bottomNav={false}
    >
      <RequestSuccessForm />
    </PageFrame>
  );
};

export default RequestSuccessPage;
