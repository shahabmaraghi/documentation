import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deployment Workflow",
  description: "راهنمای استقرار و دیپلوی مستندات",
};

export default function DeploymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

