import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ارسال پیامک اعتبار سنجی (OTP)",
  description: "راهنمای ارسال پیامک OTP با استفاده از قالب‌های از پیش تعریف شده در API قاصدک",
};

export default function SendOtpSmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

