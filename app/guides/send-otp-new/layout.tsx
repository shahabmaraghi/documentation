import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ارسال پیامک OTP جدید",
  description: "راهنمای ارسال OTP با قابلیت‌های پیشرفته‌تر در API قاصدک",
};

export default function SendOtpNewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

