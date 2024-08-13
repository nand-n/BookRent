import Image from 'next/image';
import React from 'react';

interface IconWrapperProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  src,
  alt = '',
  width = 16,
  height = 16,
  className = '',
  style = {},
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};

export default IconWrapper;
