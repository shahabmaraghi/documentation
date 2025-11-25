import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CLI Commands",
  description: "مرجع دستورات خط فرمان",
};

export default function CliLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

