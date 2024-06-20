"use client";

import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "@/lib/redux/User/UserSlice";
import { getError } from "@/lib/getError";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  content: z.string(),
});

export default function DialogBoxInput() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.

  //   setLoading(true);
  //   try {
  //     const { data } = await axios.post("/user/editor/signin", {
  //       content: values.content,
  //     });
  //     setLoading(false);
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       toast({
  //         title: "Error",
  //         description: getError(err),
  //         variant: "destructive",
  //       });
  //       setLoading(false);
  //     }
  //   }
  // }

  useEffect(() => {
    if (!userInfo) redirect("/");
  });

  if (!userInfo === undefined) return;
  return <div>DialogBoxInput</div>;
}
