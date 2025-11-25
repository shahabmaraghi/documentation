import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ارسال گروهی نظیر به نظیر",
  description: "راهنمای ارسال پیامک‌های مختلف به گیرندگان مختلف با استفاده از API قاصدک",
};

export default function SendBulkPeerToPeerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

