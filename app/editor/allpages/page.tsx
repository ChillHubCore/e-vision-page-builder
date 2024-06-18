import { PageFilters } from "@/components/common";
import React, { Suspense } from "react";

export default function AllPagesPage() {
  return (
    <div>
      <Suspense>
        <PageFilters />
      </Suspense>
    </div>
  );
}
