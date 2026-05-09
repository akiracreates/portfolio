"use client";

import Image from "next/image";
import { imageKitLoader } from "@/lib/images/imagekit-loader";

/**
 * Client boundary required: `next/image` + custom `loader` cannot be passed from
 * Server Components (functions are not serializable). Same ImageKit loader as SmartImage.
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
