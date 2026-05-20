"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const { dir } = useSettingsStore();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = useSettingsStore.getState().language;
  }, [dir]);

  return <>{children}</>;
}
