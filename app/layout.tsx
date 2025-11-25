import type { Metadata } from "next";
import type { ReactNode } from "react";

import RootLayoutClient from "./RootLayoutClient";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "نمای کلی مستندات - مستنداتت پیام کوتاه ",
    template: "مستندات پیام کوتاه قاصدک",
  },
  description: "مستندات کامل API پیامک قاصدک",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="rtl" data-theme="light" suppressHydrationWarning>
      <body className="doc-body is-rtl is-light">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
