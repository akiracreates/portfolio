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
 * Builds an ImageKit delivery URL with bandwidth-friendly defaults.
 * Example: imagekitUrl("images/portraits/self")
 */
export function imagekitUrl(path, transforms = ["f-auto", "q-auto"]) {
  const endpoint = getImageKitEndpoint();
  if (!endpoint) return "";
  const cleanPath = trimLeadingSlash(path);
  const separator = cleanPath.includes("?") ? "&" : "?";
  const transformParam =
    transforms && transforms.length > 0
      ? `${separator}tr=${encodeURIComponent(transforms.join(","))}`
      : "";

  return `${endpoint}/${cleanPath}${transformParam}`;
}
