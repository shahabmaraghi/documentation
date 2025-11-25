import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Send Single SMS",
  description: "راهنمای ارسال پیامک تکی",
};

export default function SendSingleSmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

