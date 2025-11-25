import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ارسال گروهی",
  description: "راهنمای ارسال یک پیامک به چندین گیرنده مختلف با استفاده از API قاصدک",
};

export default function SendBulkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

