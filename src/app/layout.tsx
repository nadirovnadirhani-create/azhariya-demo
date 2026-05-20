import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { DirectionProvider } from "@/app/providers/DirectionProvider";
import { OnboardingGate } from "@/app/providers/OnboardingGate";
import Navbar from "@/widgets/Navbar";
import BottomNav from "@/widgets/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Академия арабского языка Azharia",
  description: "Изучайте арабский язык по методике Аль-Азхар",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${inter.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <QueryProvider>
            <DirectionProvider>
              <OnboardingGate>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow pt-16 pb-20 md:pb-0">
                    {children}
                  </main>
                  <BottomNav />
                </div>
              </OnboardingGate>
            </DirectionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
