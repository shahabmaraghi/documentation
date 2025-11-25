import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "کتابخانه‌ها و SDK",
  description: "راهنمای نصب و استفاده از SDK و کتابخانه‌های قاصدک برای زبان‌های مختلف برنامه‌نویسی",
};

export default function SdkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

