import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Start",
  description: "راهنمای شروع سریع نصب وابستگی‌ها و اجرای مستندات به صورت محلی",
};

export default function GettingStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

