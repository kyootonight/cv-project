import React, { useMemo } from "react";
import { motion } from "framer-motion";

function FloatingPaths({ position }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
        duration: 20 + (i % 10) * 1.1,
      })),
    [position]
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-sky-300"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
  key={path.id}
  d={path.d}
  stroke="currentColor"
  strokeWidth={path.width}
  strokeOpacity={0.08 + path.id * 0.015}
  initial={{ pathLength: 0.65, pathOffset: 0 }}
  animate={{
    pathOffset: [0, 1],
  }}
  transition={{
    duration: path.duration,
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
  }}
/>
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPathsLayer({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}