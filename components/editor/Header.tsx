import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-gray-800 text-white fixed py-4 w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">E-Vision Page Builder Dashboard</Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
