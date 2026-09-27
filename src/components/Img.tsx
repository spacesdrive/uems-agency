import { images, type ImageName } from '../data/images';

interface ImgProps {
  name: ImageName;
  alt: string;
  /** `sizes` attribute; defaults to full viewport width. */
  sizes?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  /** Load eagerly without raising priority (e.g. small, already-cached assets). */
  eager?: boolean;
  className?: string;
}

const base = '/images/';

export function imageUrl(name: ImageName, width?: number): string {
  const asset = images[name];
  if ('file' in asset) return base + asset.file;
  const variants: readonly number[] = asset.variants;
  const chosen = width ? (variants.find((w) => w >= width) ?? asset.width) : asset.width;
  return `${base}${name}-${chosen}.webp`;
}

export function Img({ name, alt, sizes = '100vw', priority = false, eager = false, className }: ImgProps) {
  const asset = images[name];
  const variants: readonly number[] = asset.variants;
  const srcSet = variants.length > 1 ? variants.map((w) => `${base}${name}-${w}.webp ${w}w`).join(', ') : undefined;

  return (
    <img
      className={className}
      src={imageUrl(name, 960)}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={asset.width}
      height={asset.height}
      alt={alt}
      loading={priority || eager ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}
