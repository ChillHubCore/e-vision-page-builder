import { HeaderGenerator } from "@/components/common";
import { getData } from "@/lib/getData";
import React, { Suspense } from "react";

export default async function HeaderSettingsPage() {
  try {
    const HeaderData = await getData("/header", 0);
    return (
      <div>
        <Suspense>
          <HeaderGenerator
            title={HeaderData.title}
            backgroundStyle={HeaderData.backgroundStyle}
            titleStyle={HeaderData.titleStyle}
            logo={HeaderData.logo}
          />
        </Suspense>
      </div>
    );
  } catch (e) {
    return (
      <div>
        <p>There is no Old Record Of a Header! - Make a New One!</p>
        <Suspense>
          <HeaderGenerator />
        </Suspense>
      </div>
    );
  }
}
