"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useSettingsStore } from "@/store/useSettingsStore";

/**
 * Routes that require the user to finish onboarding first.
 * Landing (`/`), auth, onboarding itself, and the wallet (for payment)
 * are always accessible.
 */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/lessons",
  "/lesson",
  "/quiz",
  "/handwriting",
  "/profile",
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Redirects an authed user who has not yet completed onboarding to /onboarding.
 * No-op for guests (useAuthStore.user is null) and for completed users.
 */
export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const onboardingComplete = useSettingsStore((s) => s.onboardingComplete);

  useEffect(() => {
    if (!user) return;
    if (onboardingComplete) return;
    if (!isProtectedPath(pathname)) return;
    router.replace("/onboarding");
  }, [user, onboardingComplete, pathname, router]);

  return <>{children}</>;
}
