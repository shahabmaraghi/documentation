import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه بندی پیام های دریافتی",
  description: "دریافت پیام‌های دریافتی به صورت صفحه‌بندی شده از API قاصدک",
};

export default function PaginatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

