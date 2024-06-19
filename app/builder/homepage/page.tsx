import { PageBuilder } from "@/components/common";
import React, { Suspense } from "react";

export default function HomeBuilderPage() {
  return (
    <div>
      <Suspense>
        <PageBuilder slug="/" />
      </Suspense>
    </div>
  );
}
