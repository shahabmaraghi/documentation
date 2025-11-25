import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جدول کدهای خطا - مستنداتت پیام کوتاه قاصدک",
  description: "جدول کامل کدهای خطای API پیامک قاصدک",
};

export default function ErrorTableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

