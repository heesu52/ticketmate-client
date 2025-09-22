import React from 'react';

interface SpacerProps {
  size: number | string;
  direction?: 'vertical' | 'horizontal';
  style?: React.CSSProperties;
}

/**
 * 스페이서
 * @param size 사이즈
 * @param direction 방향
 * @param style css 스타일
 */
const Spacer = ({ size, direction = 'vertical', style }: SpacerProps) => {
  const spacerStyle: React.CSSProperties = {
    height: direction === 'vertical' ? `${size}px` : '100%',
    width: direction === 'horizontal' ? `${size}px` : '100%',
    ...style,
  };

  return <div style={spacerStyle} aria-hidden></div>;
};

export default Spacer;
