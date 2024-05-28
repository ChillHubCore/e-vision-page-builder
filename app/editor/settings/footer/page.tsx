import { FooterGenerator } from "@/components/common";
import { getData } from "@/lib/getData";
import React, { Suspense } from "react";

export default async function FooterSettingsPage() {
  try {
    const FooterData = await getData("/footer", 0);
    return (
      <div>
        <Suspense>
          <FooterGenerator
            title={FooterData.title}
            containerClassName={FooterData.containerClassName}
            titleClassName={FooterData.titleClassName}
          />
        </Suspense>
      </div>
    );
  } catch (e) {
    return (
      <div>
        <p>There is no Old Record Of a Footer! - Make a New One!</p>
        <Suspense>
          <FooterGenerator
            title={""}
            containerClassName={""}
            titleClassName={""}
          />
        </Suspense>
      </div>
    );
  }
}
