"use client";

import { getError } from "@/lib/getError";
import React, { useState } from "react";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import axios from "@/lib/axios";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/lib/redux/User/UserSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { IconPlus } from "@tabler/icons-react";
import { Switch } from "../ui/switch";

const formSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  active: z.boolean(),
});

export default function PageGenerator() {
  const [loading, setLoading] = useState(false);
  const [inputKeywords, setInputKeywords] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const userInfo = useSelector(selectUserInfo);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      active: false,
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/page",
        {
          title: values.title,
          slug: values.slug,
          keywords: keywords,
          description: values.description,
          active: values.active,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      if (data) {
        toast({
          title: "Success",
          description: "Page Updated Successfully!",
        });
      }
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: getError(err),
          variant: "destructive",
        });
        setLoading(false);
      }
    }
  }

  return (
    <div className="align-middle p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Title</FormLabel>
                <FormControl>
                  <Input placeholder="Write a title for the page" {...field} />
                </FormControl>
                <FormDescription>Title For The Page</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Write a slug for the page" {...field} />
                </FormControl>
                <FormDescription>Slug For The Page</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <>
            <p>Page Keywords</p>
            <div className="flex flex-row justify-between gap-5">
              <Input
                placeholder="Input a Keyword Related to The Page You are Making."
                onChange={(e) => setInputKeywords(e.target.value)}
                value={inputKeywords}
              />
              <IconPlus
                className="cursor-pointer"
                onClick={() => {
                  if (keywords.includes(inputKeywords)) {
                    toast({
                      title: "Error",
                      description: "Keyword Already Exists",
                      variant: "destructive",
                    });
                  } else {
                    setKeywords([...keywords, inputKeywords]);
                  }
                  setInputKeywords("");
                }}
              />
            </div>
            <div className="grid grid-cols-8 space-y-2 space-x-2">
              {keywords.map((keyword) => (
                <span
                  className="dark:bg-slate-700 p-3 rounded-lg"
                  key={keyword}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write a description for the page"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Description For The Page</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Active</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
