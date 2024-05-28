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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  colorWeights,
  TailwindColors,
  tailwindFontSize,
  tailwindFontWeight,
} from "@/lib/constants";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z.string(),
  logo: z.string(),
  titleStyle: z.object({
    color: z.string(),
    colorWeight: z.string(),
    fontSize: z.string(),
    fontWeight: z.string(),
  }),
  backgroundStyle: z.object({
    color: z.string(),
    colorWeight: z.string(),
    isSticky: z.boolean(),
  }),
});

export default function HeaderGenerator({
  title,
  logo,
  titleStyle,
  backgroundStyle,
}: {
  title?: string;
  logo?: string;
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
}) {
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title || "",
      logo: logo || "",
      titleStyle: titleStyle || {
        color: "slate",
        colorWeight: "500",
        fontSize: "text-2xl",
        fontWeight: "font-bold",
      },
      backgroundStyle: backgroundStyle || {
        color: "slate",
        colorWeight: "500",
        isSticky: false,
      },
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
          titleStyle: values.titleStyle,
          backgroundStyle: values.backgroundStyle,
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
          <>
            <p>Header Background Styles</p>
            <hr />
            <FormField
              control={form.control}
              name="backgroundStyle.color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Choose a Background Color For The Header
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Colors" />
                      </SelectTrigger>
                      <SelectContent>
                        {TailwindColors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Background Color For The Header
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="backgroundStyle.colorWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Choose a Background Color Weight For The Header
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Color Weight" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorWeights.map((weight) => (
                          <SelectItem value={weight} key={weight}>
                            {weight}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Background Color Weight For The Header
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="backgroundStyle.isSticky"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sticky Header</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Do You Want The Header To Be Sticky?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <>
              <p
                className={`bg-${form.getValues(
                  "backgroundStyle.color"
                )}-${form.getValues(
                  "backgroundStyle.colorWeight"
                )} p-2 rounded-xl`}
              >
                {form.getValues("backgroundStyle.color")}-
                {form.getValues("backgroundStyle.colorWeight")}
              </p>
            </>
          </>
          <>
            <p>Title Styles</p>
            <hr />
            <FormField
              control={form.control}
              name="titleStyle.color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a Title Color</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Colors" />
                      </SelectTrigger>
                      <SelectContent>
                        {TailwindColors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Title Color</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleStyle.colorWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a Title Color Weight</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Color Weight" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorWeights.map((weight) => (
                          <SelectItem value={weight} key={weight}>
                            {weight}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Title Color Weight</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleStyle.fontSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a Title Font Size</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Font Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {tailwindFontSize.map((size) => (
                          <SelectItem value={size} key={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Title Font Size</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleStyle.fontWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a Title Font Weight</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Font Weight" />
                      </SelectTrigger>
                      <SelectContent>
                        {tailwindFontWeight.map((weight) => (
                          <SelectItem value={weight} key={weight}>
                            {weight}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Title Font Size</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <>
              <p
                className={`text-${form.getValues(
                  "titleStyle.color"
                )}-${form.getValues("titleStyle.colorWeight")} ${form.getValues(
                  "titleStyle.fontSize"
                )} ${form.getValues("titleStyle.fontWeight")}`}
              >
                {form.getValues("titleStyle.color")}-
                {form.getValues("titleStyle.colorWeight")}-
                {form.getValues("titleStyle.fontSize")}-
                {form.getValues("titleStyle.fontWeight")}
              </p>
            </>
          </>
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
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
