import React from "react";
import Header from "../dynamics/Header";
import Footer from "../dynamics/Footer";
import { getData } from "@/lib/getData";

export default async function DynamicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const HeaderData = await getData("/header", 0);
  const FooterData = await getData("/footer", 0);

  return (
    <main>
      <Header
        title={HeaderData.title}
        containerClassName={HeaderData.containerClassName}
        titleClassName={HeaderData.titleClassName}
      />
      <div className="flex justify-between">
        <div className="flex min-h-screen flex-col items-center justify-between py-24 sm:px-16 p-4">
          <>{children}</>
        </div>
      </div>
      <Footer
        title={FooterData.title}
        containerClassName={FooterData.containerClassName}
        titleClassName={FooterData.titleClassName}
      />
    </main>
  );
}
