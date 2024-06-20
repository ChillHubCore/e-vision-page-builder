"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import axios from "@/lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, signIn } from "@/lib/redux/User/UserSlice";
import { toast } from "../ui/use-toast";
import { getError } from "@/lib/getError";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Authentication() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setLoading(true);
    try {
      const { data } = await axios.post("/user/editor/signin", {
        email: values.email,
        password: values.password,
      });
      dispatch(signIn(data));
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

  useEffect(() => {
    if (userInfo) redirect("/");
  });

  if (userInfo === undefined) return;
  return (
    <div className="align-middle p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address." {...field} />
                </FormControl>
                <FormDescription>Enter your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password."
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
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
