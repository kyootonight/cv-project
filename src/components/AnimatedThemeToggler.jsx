import React, { useRef, useCallback } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedThemeToggler = ({
  isDark,
  onToggle,
  duration = 700,
  className = "",
}) => {
  const buttonRef = useRef(null);

  const handleClick = useCallback(async () => {
    if (!buttonRef.current) return;

    // Cek dukungan View Transitions API di browser
    if (!document.startViewTransition) {
      onToggle?.();
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        onToggle?.();
      });
    });

    await transition.ready;

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const maxDistance = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${centerX}px ${centerY}px)`,
          `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [onToggle, duration]);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      aria-label="Switch theme"
      className={`flex items-center justify-center rounded-full outline-none focus:outline-none focus:ring-0 cursor-pointer ${className}`}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: 25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.55 }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            <Sun size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="moon-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.55 }}
            transition={{ duration: 0.3 }}
            className="text-zinc-950"
          >
            <Moon size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};