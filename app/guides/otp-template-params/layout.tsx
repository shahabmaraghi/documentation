import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دریافت پارامترهای قالب OTP",
  description: "راهنمای دریافت اطلاعات و پارامترهای قالب‌های OTP از API قاصدک",
};

export default function OtpTemplateParamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

