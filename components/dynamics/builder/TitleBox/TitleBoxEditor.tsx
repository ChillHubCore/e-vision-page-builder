"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  content: z.object({
    text: z.string(),
    order: z.string(),
  }),
  styles: z.string(),
});

export default function TitleBoxEditor({
  previousContent,
  previousStyles,
  onSave,
}: {
  previousContent?: {
    text: string;
    order: string;
  };
  previousStyles?: string;
  onSave?: any;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: previousContent || {
        text: "This is a Title Box Component",
        order: "1",
      },
      styles: previousStyles || "text-center",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (onSave) onSave(values);
  }
  console.log(previousContent, previousStyles);
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content.text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Box Content</FormLabel>
                <FormControl>
                  <Input placeholder="Write a Title" {...field} />
                </FormControl>
                <FormDescription>
                  The content of the Title Box component.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content.order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Box Order</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose The Header Title Order" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">H1</SelectItem>
                    <SelectItem value="2">H2</SelectItem>
                    <SelectItem value="3">H3</SelectItem>
                    <SelectItem value="4">H4</SelectItem>
                    <SelectItem value="5">H5</SelectItem>
                    <SelectItem value="6">H6</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The order of the Title Box component.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="styles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Box Styles</FormLabel>
                <FormControl>
                  <Input placeholder="Write a Title" {...field} />
                </FormControl>
                <FormDescription>
                  The styles of the Title Box component.
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
