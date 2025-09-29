import Link from 'next/link';

import { ArrowRightIcon } from '@/assets/icons';
import {
  InformationBannerType,
  InformationBannerVariant,
} from '@/shared/components/ui/banner/information-banner/information.type';

import styles from './information-banner.module.scss';

interface InformationBannerProps {
  /** 배너 제목 */
  title?: string;
  /** 배너 설명 */
  description?: string;
  /** 배너 타입 (텍스트 또는 링크) */
  type?: InformationBannerType;
  /** 배너 스타일 변형 */
  variant?: InformationBannerVariant;
  /** 링크 타입일 때 이동할 URL */
  href?: string;
}

const InformationBanner = ({
  title,
  description,
  type = 'text',
  variant = 'info',
  href,
}: InformationBannerProps) => {
  const BannerContent = () => (
    <>
      <div className={styles.content}>
        {title && <span className={styles.title}>{title}</span>}
        <div className={styles.description_container}>
          {description && <p className={styles.description}>{description}</p>}
          {type === 'link' && <ArrowRightIcon className={styles.arrow} />}
        </div>
      </div>
    </>
  );

  // 링크 타입인 경우 Link 컴포넌트 사용
  if (type === 'link' && href) {
    return (
      <Link href={href} className={styles.container} data-variant={variant}>
        <BannerContent />
      </Link>
    );
  }

  // 기본 텍스트 타입
  return (
    <div className={styles.container} data-variant={variant}>
      <BannerContent />
    </div>
  );
};

export default InformationBanner;
