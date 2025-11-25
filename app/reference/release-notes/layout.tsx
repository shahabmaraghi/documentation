import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Release Notes",
  description: "تاریخچه تغییرات و به‌روزرسانی‌های مستندات",
};

export default function ReleaseNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

