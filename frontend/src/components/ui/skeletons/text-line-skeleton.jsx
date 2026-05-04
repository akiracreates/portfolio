import { Skeleton } from "@/components/ui/skeleton";

export function TextLineSkeleton({
  width = "100%",
  height = "0.875rem",
  rounded = "sm",
  className = "",
}) {
  return (
    <Skeleton
      rounded={rounded}
      className={className}
      style={{ width, height }}
    />
  );
}

export function TextLines({ lines = 3, lastShorter = true, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`.trim()}>
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1;
        return (
          <Skeleton
            key={i}
            rounded="sm"
            className="h-3"
            style={{
              width: isLast && lastShorter ? "62%" : "100%",
            }}
          />
        );
      })}
    </div>
  );
}
