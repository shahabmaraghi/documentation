import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پیام های دریافتی",
  description: "گزارش پیام‌های ورودی خطوط شما",
};

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

