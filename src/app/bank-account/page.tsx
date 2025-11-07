'use client';

import BankAccountCard from '@/app/bank-account/_shared/components/bank-account-card/bank-account-card';
import { useGetBankAccountList } from '@/app/bank-account/_shared/services/query';
import PageFrame from '@/shared/components/layout/page-frame/page-frame';
import Button from '@/shared/components/ui/button/button';
import Spacer from '@/shared/components/ui/spacer/spacer';
import { useNavigation } from '@/shared/hooks/navigation/use-navigation';

import styles from './page.module.scss';

const BankAccountPage = () => {
  const navigation = useNavigation();
  const { data } = useGetBankAccountList();

  const handleNavigate = (agentBankAccountId?: string) => {
    navigation.navigate({
      pathname: '/bank-account',
      search: agentBankAccountId
        ? `?accountId=${agentBankAccountId}`
        : undefined,
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
          {data?.map((bankAccount) => (
            <BankAccountCard
              key={bankAccount.agentBankAccountId}
              bankAccountData={bankAccount}
            />
          ))}
        </div>
        <Spacer size={12} />

        <span>* 계좌는 최대 5개까지 등록 가능합니다.</span>

        <div className={styles.button}>
          <Button variant="fill" onClick={() => handleNavigate()}>
            계좌 추가하기
          </Button>
        </div>
        <Spacer size={20} />
      </div>
    </PageFrame>
  );
};

export default BankAccountPage;
