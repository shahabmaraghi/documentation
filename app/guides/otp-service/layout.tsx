import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سرویس اعتبار سنجی",
  description: "مدیریت کامل پیامک‌های OTP و قالب‌های اعتبارسنجی",
};

export default function OtpServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

