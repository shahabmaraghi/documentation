import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuration",
  description: "مرجع تنظیمات و پیکربندی مستندات",
};

export default function ConfigurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

