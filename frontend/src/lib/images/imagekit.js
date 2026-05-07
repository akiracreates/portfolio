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
function normalizeTransforms(transforms) {
  if (Array.isArray(transforms)) return transforms.filter(Boolean);
  if (typeof transforms === "string" && transforms.trim()) {
    return transforms
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  }
  return [];
}

export function imagekitUrl(path, transforms = ["f-auto", "q-auto"]) {
  const endpoint = getImageKitEndpoint();
  if (!endpoint) return "";
  const cleanPath = trimLeadingSlash(path);
  const encodedPath = encodeURI(cleanPath);
  const normalizedTransforms = normalizeTransforms(transforms);
  const separator = encodedPath.includes("?") ? "&" : "?";
  const transformParam =
    normalizedTransforms.length > 0
      ? `${separator}tr=${encodeURIComponent(normalizedTransforms.join(","))}`
      : "";

  return `${endpoint}/${encodedPath}${transformParam}`;
}
