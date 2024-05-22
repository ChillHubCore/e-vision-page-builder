import { HeaderGenerator } from "@/components/common";
import { getData } from "@/lib/getData";
import React, { Suspense } from "react";

export default async function HeaderSettingsPage() {
  const HeaderData = await getData("/header", 0);
  return (
    <div>
      <Suspense>
        <HeaderGenerator
          title={HeaderData.title}
          containerClassName={HeaderData.containerClassName}
          titleClassName={HeaderData.titleClassName}
          logo={HeaderData.logo}
        />
      </Suspense>
    </div>
  );
}
