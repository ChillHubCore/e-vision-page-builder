import React from "react";

export default function Footer({
  containerClassName,
  titleClassName,
  title,
}: {
  containerClassName?: string;
  titleClassName?: string;
  title?: string;
}) {
  return (
    <footer className={containerClassName || ""}>
      <div className="container mx-auto text-center">
        <p className={titleClassName || ""}>{title || ""}</p>
      </div>
    </footer>
  );
}
