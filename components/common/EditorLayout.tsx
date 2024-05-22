import React from "react";
import { Header } from "../editor/Header";
import { Footer } from "../editor/Footer";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-between py-24 sm:px-16 p-4">
        {children}
      </div>
      <Footer />
    </main>
  );
}
