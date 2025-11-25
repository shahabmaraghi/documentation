import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "100 پیام آخر",
  description: "مشاهده آخرین 100 پیام دریافتی از API قاصدک",
};

export default function Latest100Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

