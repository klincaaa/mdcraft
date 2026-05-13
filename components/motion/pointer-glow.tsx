"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

/** Subtle spotlight that follows pointer — desktop only feel. */
export function PointerGlow({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  const background = useMotionTemplate`
    radial-gradient(520px circle at ${sx}px ${sy}px, rgba(245,158,11,0.14), transparent 55%)
  `;

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-0 mix-blend-screen", className)}
      style={{ background }}
    />
  );
}
