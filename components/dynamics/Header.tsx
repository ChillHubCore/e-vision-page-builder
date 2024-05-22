import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../editor/ThemeToggle";

export default async function Header({
  containerClassName,
  titleClassName,
  title,
}: {
  containerClassName: string;
  titleClassName: string;
  title: string;
}) {
  return (
    <header className={containerClassName}>
      <div className="container mx-auto flex justify-between items-center">
        <Link className={titleClassName} href="/">
          {title}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
