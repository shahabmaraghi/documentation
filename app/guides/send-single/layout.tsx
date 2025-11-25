import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ارسال تکی",
  description: "راهنمای ارسال پیامک به یک شماره گیرنده با استفاده از API قاصدک",
};

export default function SendSingleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

