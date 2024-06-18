import React from "react";

export default function Footer({
  backgroundStyle,
  titleStyle,
  title,
}: {
  titleStyle?: {
    color: string;
    colorWeight: string;
    fontSize: string;
    fontWeight: string;
  };
  backgroundStyle?: {
    color: string;
    colorWeight: string;
    isSticky: boolean;
  };
  title: string;
}) {
  const isFooterSticky = backgroundStyle?.isSticky === true ? "fixed" : "";
  const generatedBackgroundStyle =
    "text-" +
    (titleStyle?.color ?? "") +
    "-" +
    (titleStyle?.colorWeight ?? "") +
    " " +
    isFooterSticky +
    " " +
    "bg-" +
    backgroundStyle?.color +
    "-" +
    backgroundStyle?.colorWeight;

  const generatedTitleStyle =
    (titleStyle?.fontSize ?? "") + " " + (titleStyle?.fontWeight ?? "");
  return (
    <footer className={generatedBackgroundStyle + " py-4 w-full bottom-0 z-10"}>
      <div className="container mx-auto text-center">
        <p className={generatedTitleStyle}>{title || ""}</p>
      </div>
    </footer>
  );
}
