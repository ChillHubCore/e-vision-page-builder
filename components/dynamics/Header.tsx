import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../editor/ThemeToggle";

export default async function Header({
  backgroundStyle,
  titleStyle,
  title,
}: {
  titleStyle?: {
    color: string;
    colorWeight: string;
    fontSize: string;
    fontWeight: string;
  };
  backgroundStyle?: {
    color: string;
    colorWeight: string;
    isSticky: boolean;
  };
  title: string;
}) {
  const isHeaderSticky = backgroundStyle?.isSticky === true ? "fixed" : "";
  const generatedBackgroundStyle =
    "text-" +
    (titleStyle?.color ?? "") +
    "-" +
    (titleStyle?.colorWeight ?? "") +
    " " +
    isHeaderSticky +
    " " +
    "bg-" +
    backgroundStyle?.color +
    "-" +
    backgroundStyle?.colorWeight;

  const generatedTitleStyle =
    (titleStyle?.fontSize ?? "") + " " + (titleStyle?.fontWeight ?? "");
  return (
    <header className={generatedBackgroundStyle + " py-4 w-full top-0 z-10"}>
      <div className="container mx-auto flex justify-between items-center">
        <Link className={generatedTitleStyle} href="/">
          {title}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
