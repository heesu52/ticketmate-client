import BankAccountCard from '@/app/bank-account/_shared/bank-account-card/bank-account-card';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Spacer from '@/shared/components/ui/spacer/spacer';

import styles from './page.module.scss';

const BankAccountPage = () => {
  const testAccounts = [
    { accountName: '카카오뱅크', accountNum: '3333-01-1234567', isMain: true },
    { accountName: '신한은행', accountNum: '110-222-333344' },
    { accountName: '하나은행', accountNum: '123-456789-01-001' },
    { accountName: '우리은행', accountNum: '1002-123-456789' },
  ];

  return (
    <PageFrame
      appBar={{
        title: '계좌 관리',
        showBack: true,
      }}
      bottomNav={false}
    >
      <div className={styles.container}>
        <div className={styles.list_container}>
          {testAccounts.map((account) => (
            <>
              <Spacer size={20} />
              <BankAccountCard
                key={account.accountNum}
                accountName={account.accountName}
                accountNum={account.accountNum}
                isMain={account.isMain}
              />
            </>
          ))}
          <Spacer size={12} />
          <span>* 계좌는 최대 5개까지 등록 가능합니다.</span>
        </div>
        <Button variant="fill">계좌 추가하기</Button>
      </div>
    </PageFrame>
  );
};

export default BankAccountPage;
