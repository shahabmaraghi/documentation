import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "وضعیت پیام های ارسالی",
  description: "بررسی وضعیت ارسال پیامک‌ها از API قاصدک",
};

export default function OutboxStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

