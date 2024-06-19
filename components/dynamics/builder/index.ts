import { lazy } from "react";

//component preview pictures

import DialogBoxImage from "@/assests/images/components/dynamics/DialogBox.jpg";

export const DialogBox = lazy(() => import("./DialogBox"));

export const ComponentList = [
  { name: "DialogBox", previewImage: DialogBoxImage, component: DialogBox },
];
