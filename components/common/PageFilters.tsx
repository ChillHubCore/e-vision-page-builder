import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function PageFilters() {
  return (
    <div>
      <Link href={"/editor/createpage"}>
        <Button>Create New Page</Button>
      </Link>
    </div>
  );
}
