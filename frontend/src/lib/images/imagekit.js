function trimTrailingSlash(value = "") {
  return value.replace(/\/+$/, "");
}

function trimLeadingSlash(value = "") {
  return value.replace(/^\/+/, "");
}

export function getImageKitEndpoint() {
  const configured = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "";

  return trimTrailingSlash(configured);
}

/**
 * Builds an ImageKit delivery URL and applies default optimization transforms.
 * Example: imagekitUrl("images/portraits/self")
 */
export function imagekitUrl(path, transforms = []) {
  const endpoint = getImageKitEndpoint();
  if (!endpoint) return "";
  const cleanPath = trimLeadingSlash(path);
  const transformParam =
    transforms && transforms.length > 0
      ? `?tr=${encodeURIComponent(transforms.join(","))}`
      : "";

  return `${endpoint}/${cleanPath}${transformParam}`;
}
