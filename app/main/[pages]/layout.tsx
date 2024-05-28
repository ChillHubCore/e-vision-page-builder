import DynamicLayout from "@/components/common/DynamicLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic Page Title",
  description: "Dynamic Page Description",
};

export default function DynamicDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DynamicLayout>{children}</DynamicLayout>;
}
