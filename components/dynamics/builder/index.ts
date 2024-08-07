import { lazy } from "react";

//component preview pictures

import TempImage from "@/assests/images/components/dynamics/HeroBanner.gif";

export const DialogBox = lazy(() => import("./DialogBox/DialogBox"));
export const DialogBoxEditor = lazy(
  () => import("./DialogBox/DialogBoxEditor")
);
export const HeroBanner = lazy(() => import("./HeroBanner/HeroBanner"));
export const HeroBannerEditor = lazy(
  () => import("./HeroBanner/HeroBannerEditor")
);
export const TitleBox = lazy(() => import("./TitleBox/TitleBox"));
export const TitleBoxEditor = lazy(() => import("./TitleBox/TitleBoxEditor"));

export const ComponentList = [
  {
    name: "DialogBox",
    previewImage: TempImage,
    component: DialogBox,
    editor: DialogBoxEditor,
  },
  {
    name: "HeroBanner",
    previewImage: TempImage,
    component: HeroBanner,
    editor: HeroBannerEditor,
  },
  {
    name: "TitleBox",
    previewImage: TempImage,
    component: TitleBox,
    editor: TitleBoxEditor,
  },
];
