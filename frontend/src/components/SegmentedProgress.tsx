interface SegmentedProgressProps {
  totalSegments?: number;
  filledSegments: number;
  tone?: "volt" | "green" | "mixed";
  className?: string;
}

export function SegmentedProgress({
  totalSegments = 5,
  filledSegments,
  tone = "volt",
  className = "",
}: SegmentedProgressProps) {
  return (
    <div
      className={`grid gap-1.5 w-full h-2 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${totalSegments}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: totalSegments }).map((_, idx) => {
        const isFilled = idx < filledSegments;
        let fillClass = "bg-surface-variant";
        if (isFilled) {
          if (tone === "green") {
            fillClass = "bg-tertiary-fixed-dim";
          } else if (tone === "mixed") {
            fillClass =
              idx < Math.floor(totalSegments * 0.45)
                ? "bg-tertiary-fixed-dim"
                : "bg-primary-fixed";
          } else {
            fillClass = "bg-primary-fixed shadow-[0_0_8px_rgba(195,244,0,0.45)]";
          }
        }
        return (
          <div
            key={idx}
            className={`h-full rounded-sm transition-colors ${fillClass}`}
          />
        );
      })}
    </div>
  );
}

