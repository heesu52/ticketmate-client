import Image from 'next/image';

import { CloseIcon } from '@/assets/icons';

import styles from './uploaded-image.module.scss';

interface UploadedImageProps {
  imageURL: string;
  alt: string;
  onRemove: () => void;
  width?: number;
  height?: number;
}

const UploadedImage = ({
  imageURL,
  alt,
  onRemove,
  width = 115,
  height = 115,
}: UploadedImageProps) => {
  return (
    <div className={styles.container}>
      <button className={styles.close_button} type="button" onClick={onRemove}>
        <CloseIcon width={20} height={20} fill="var(--grayscale-100)" />
      </button>
      <div className={styles.image_container}>
        <Image
          className={styles.image}
          src={imageURL}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default UploadedImage;
