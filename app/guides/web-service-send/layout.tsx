import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "وب سرویس ارسال",
  description: "راهنمای ارسال پیامک تکی، گروهی و نظیر به نظیر با استفاده از API قاصدک",
};

export default function WebServiceSendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

