import { EditorLayout } from "@/components/common";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Vision Page Editor",
  description: "E-Vision Page Editor",
};

export default function EditorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EditorLayout>{children}</EditorLayout>;
}
