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
        backgroundStyle={HeaderData.backgroundStyle}
        titleStyle={HeaderData.titleStyle}
      />

      <div className="flex min-h-screen flex-col py-24 sm:px-16 p-4 w-full">
        <>{children}</>
      </div>

      <Footer
        title={FooterData.title}
        backgroundStyle={FooterData.backgroundStyle}
        titleStyle={FooterData.titleStyle}
      />
    </main>
  );
}
