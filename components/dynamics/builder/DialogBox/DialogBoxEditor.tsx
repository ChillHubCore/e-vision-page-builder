"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EVRichTextEditor } from "@/components/common";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const formSchema = z.object({
  content: z.string(),
});

export default function DialogBoxEditor({
  onSave,
  previousContent,
  previousStyles,
}: {
  onSave?: any;
  previousContent?: string;
  previousStyles?: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: previousContent || "<p>Type a Content Here!</p>",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (onSave) onSave(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dialog Box Content</FormLabel>
                <FormControl>
                  {/* <Textarea
                    placeholder="Type your content here..."
                    className="resize-none"
                    {...field}
                  /> */}
                  <Dialog>
                    <DialogTrigger className="bg-slate-500 text-white p-3 rounded-md hover:bg-slate-600 transition duration-1000">
                      Open Text Editor
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <EVRichTextEditor
                          className="min-h-60 min-w-80"
                          {...field}
                        />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </FormControl>
                <FormDescription>
                  This is the content that will be displayed in the dialog box.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
}
