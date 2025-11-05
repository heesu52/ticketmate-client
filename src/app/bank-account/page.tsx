'use client';

import BankAccountCard from '@/app/bank-account/_shared/components/bank-account-card/bank-account-card';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';

import styles from './page.module.scss';

const BankAccountPage = () => {
  const testAccounts = [
    { accountName: '카카오뱅크', accountNum: '3333011234567', isMain: true },
    { accountName: '신한', accountNum: '110222333344' },
    { accountName: '하나', accountNum: '12345678901001' },
    { accountName: '우리', accountNum: '1002123456789' },
  ];

  const navigation = useNavigation();

  const handleNavigate = (bankAccountId?: string) => {
    navigation.navigate({
      pathname: `/bank-account/${bankAccountId}`,
    });
  };

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
        <Button variant="fill" onClick={() => handleNavigate('1234')}>
          계좌 추가하기
        </Button>
      </div>
    </PageFrame>
  );
};

export default BankAccountPage;
