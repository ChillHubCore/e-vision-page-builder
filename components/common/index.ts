import { lazy } from "react";

export const Authentication = lazy(() => import("./Authentication"));
export const EditorLayout = lazy(() => import("./EditorLayout"));
export const HeaderGenerator = lazy(() => import("./HeaderGenerator"));
export const FooterGenerator = lazy(() => import("./FooterGenerator"));
export const PageFilters = lazy(() => import("./PageFilters"));
export const PageGenerator = lazy(() => import("./PageGenerator"));
export const PageBuilder = lazy(() => import("./PageBuilder"));
export const PageConstructor = lazy(() => import("./PageConstructor"));
