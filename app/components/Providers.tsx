"use client";

import { MotionConfig } from "motion/react";

// reducedMotion="user": quem prefere menos movimento não vê transformações animadas.
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
