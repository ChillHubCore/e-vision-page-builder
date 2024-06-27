import React from "react";

export default function DialogBox({
  content,
  styles,
}: {
  content?: string;
  styles?: string;
}) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content
          ? content
          : "<p>This is a Dialog Box Component Click on Edit Button To Make Changes!</p>",
      }}
    />
  );
}
