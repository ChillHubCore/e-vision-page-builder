"use client";

import * as React from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "react-redux";
import store from "@/lib/redux/Store";

export function StoreProvider({ children }: ThemeProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
