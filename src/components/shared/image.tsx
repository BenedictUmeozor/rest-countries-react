import { ImgHTMLAttributes, memo, useEffect } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

const ImageLoader = memo(({ src, alt, ...props }: ImageProps) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  return (
    <div>
      <img src={src} alt={alt} {...props} />
    </div>
  );
});

export default ImageLoader;
