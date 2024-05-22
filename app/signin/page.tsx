import { Authentication } from "@/components/common";
import React, { Suspense } from "react";

export default function SigninPage() {
  return (
    <div>
      <Suspense>
        <Authentication />
      </Suspense>
    </div>
  );
}
