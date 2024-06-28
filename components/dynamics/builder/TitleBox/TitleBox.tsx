import React from "react";

export default function TitleBox({
  content,
  styles,
}: {
  content?: {
    text: string;
    order: string;
  };
  styles?: string;
}) {
  switch (content?.order) {
    case "1":
      return (
        <h1
          className={styles}
          dangerouslySetInnerHTML={{
            __html: content?.text || "This is a Title Box Component",
          }}
        />
      );
    case "2":
      return (
        <h2
          className={styles}
          dangerouslySetInnerHTML={{
            __html: content?.text || "This is a Title Box Component",
          }}
        />
      );
    case "3":
      return (
        <h3
          className={styles}
          dangerouslySetInnerHTML={{
            __html: content?.text || "This is a Title Box Component",
          }}
        />
      );
    case "4":
      return (
        <h4
          className={styles}
          dangerouslySetInnerHTML={{
            __html: content?.text || "This is a Title Box Component",
          }}
        />
      );
    case "5":
      return (
        <h5
          className={styles}
          dangerouslySetInnerHTML={{
            __html: content?.text || "This is a Title Box Component",
          }}
        />
      );
    case "6":
      return (
        <h6
          className={styles}
          dangerouslySetInnerHTML={{
            __html: content?.text || "This is a Title Box Component",
          }}
        />
      );
    default:
      return (
        <h1
          className={styles}
          dangerouslySetInnerHTML={{
            __html: content?.text || "This is a Title Box Component",
          }}
        />
      );
  }
}
