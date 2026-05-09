import Image from "next/image";
import { imageKitLoader } from "@/lib/images/imagekit-loader";

/**
 * Server-rendered hero portrait: no client hydration for skeleton state.
 * Uses the same ImageKit loader as SmartImage for responsive `tr=w-*`.
 */
export function HeroPortraitImage({
  src,
  alt,
  sizes,
  imgClassName = "",
  quality = 85,
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      quality={quality}
      sizes={sizes}
      loader={imageKitLoader}
      className={imgClassName}
    />
  );
}
