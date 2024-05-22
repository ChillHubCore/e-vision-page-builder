"use client";

import { getError } from "@/lib/getError";
import React, { useState } from "react";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { selectUserInfo } from "@/lib/redux/User/UserSlice";
import { useSelector } from "react-redux";
import Header from "../dynamics/Header";

const formSchema = z.object({
  title: z.string(),
  logo: z.string(),
  titleClassName: z.string(),
  containerClassName: z.string(),
});

export default function HeaderGenerator({
  title,
  logo,
  titleClassName,
  containerClassName,
}: {
  title: string;
  logo: string;
  titleClassName: string;
  containerClassName: string;
}) {
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || "",
      logo: logo || "",
      titleClassName: titleClassName || "",
      containerClassName: containerClassName || "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/header",
        {
          title: values.title,
          logo: values.logo,
          titleClassName: values.titleClassName,
          containerClassName: values.containerClassName,
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
          description: "Header Updated Successfully!",
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
                <FormLabel>App Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write a Title For The App To Be Shown in The Header!"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The title of the application.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input placeholder="Logo URL" {...field} type="url" />
                </FormControl>
                <FormDescription>Logo URL</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleClassName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Class Name</FormLabel>
                <FormControl>
                  <Input placeholder="Title Class Name" {...field} />
                </FormControl>
                <FormDescription>Title Class Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="containerClassName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Container Class Name</FormLabel>
                <FormControl>
                  <Input placeholder="Container Class Name" {...field} />
                </FormControl>
                <FormDescription>Container Class Name</FormDescription>
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
