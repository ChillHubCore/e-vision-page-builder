import React from "react";
import { Header } from "../editor/Header";
import { Footer } from "../editor/Footer";
import EditorNavBar from "./EditorNavBar";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      <div className="flex">
        <div className="flex min-h-screen flex-col items-center justify-between py-24 sm:px-16 p-4">
          <EditorNavBar />
        </div>

        <div className="flex min-h-screen flex-col items-center justify-between py-24 sm:px-16 p-4">
          <>{children}</>
        </div>
      </div>
      <Footer />
    </main>
  );
}
