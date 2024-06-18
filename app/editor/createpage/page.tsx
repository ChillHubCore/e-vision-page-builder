import { PageGenerator } from "@/components/common";
import React, { Suspense } from "react";

export default function CreatePage() {
  return (
    <div>
      <Suspense>
        <PageGenerator />
      </Suspense>
    </div>
  );
}
