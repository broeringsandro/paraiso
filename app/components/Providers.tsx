"use client";

import { MotionConfig } from "motion/react";
import { I18nProvider } from "./I18n";
import type { Locale } from "../lib/i18n";

// reducedMotion="user": quem prefere menos movimento não vê transformações animadas.
export default function Providers({ children, lang }: { children: React.ReactNode; lang: Locale }) {
  return (
    <I18nProvider lang={lang}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </I18nProvider>
  );
}
