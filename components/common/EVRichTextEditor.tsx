"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as React from "react";

const EVRichTextEditor = React.forwardRef<
  HTMLDivElement,
  {
    onChange: (value: string) => void;
    value: string;
    className?: string;
  }
>(({ onChange, value, className }, ref) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: true,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <EditorContent ref={ref} className={className || ""} editor={editor} />
  );
});
EVRichTextEditor.displayName = "EVRichTextEditor";
export { EVRichTextEditor };
