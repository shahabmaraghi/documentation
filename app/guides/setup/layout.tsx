import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Setup",
  description: "راهنمای راه‌اندازی و نصب محلی مستندات",
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

