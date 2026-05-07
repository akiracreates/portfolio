"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * SmartImage wraps next/image with a brand skeleton overlay that fades out
 * once the image finishes decoding. Supports both `fill` and intrinsic
 * (width/height) modes.
 *
 * Use the same way as <Image>; pass `fill` for cover-fit containers, or
 * `width` + `height` for intrinsic sizing.
 */
export function SmartImage({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
  rounded = "none",
  onLoad,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const useImageKitDirect =
    typeof src === "string" && src.includes("ik.imagekit.io");

  const handleLoad = (event) => {
    setLoaded(true);
    if (typeof onLoad === "function") onLoad(event);
  };

  // In `fill` mode the wrapper fills the (positioned) parent absolutely so
  // next/image's own absolute <img> has a real box to project into.
  // In intrinsic mode, the wrapper is a plain inline-block container.
  const Wrapper = fill ? "div" : "span";
  const wrapperClass = fill
    ? `absolute inset-0 block h-full w-full ${className}`.trim()
    : `relative inline-block ${className}`.trim();

  return (
    <Wrapper className={wrapperClass} data-smart-image>
      {!loaded && (
        <Skeleton
          rounded={rounded}
          className="pointer-events-none absolute inset-0"
        />
      )}
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width, height })}
        sizes={sizes}
        priority={priority}
        unoptimized={useImageKitDirect}
        onLoad={handleLoad}
        data-smart-image-loaded={loaded ? "true" : "false"}
        className={imgClassName}
        {...rest}
      />
    </Wrapper>
  );
}
