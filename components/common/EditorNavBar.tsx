import { EditorNavItems } from "@/lib/constants";
import Link from "next/link";
import React from "react";

export default function EditorNavBar() {
  const renderNavItems = EditorNavItems.map((item, index) => (
    <li key={index}>
      <Link href={item.href} className="text-blue-500 hover:text-blue-700">
        {item.label}
      </Link>
    </li>
  ));
  return (
    <ul className="flex flex-col gap-5 dark:bg-gray-900 rounded-lg p-5">
      {renderNavItems}
    </ul>
  );
}
