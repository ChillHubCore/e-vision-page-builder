"use client";

import React from "react";
import { Button } from "../ui/button";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ComponentList } from "../dynamics/builder";
import Image from "next/image";
import PageConstructor from "./PageConstructor";

export interface PageContext {
  Components: { name: string; props: any }[] | [];
}

export default function PageBuilder({ slug }: { slug?: string }) {
  const [pageComponents, setPageComponents] = React.useState<
    PageContext["Components"]
  >([]);
  const ComponentPickerDrawer = ({
    triggerContent,
    position,
  }: {
    triggerContent: string;
    position: "top" | "bottom";
  }) => (
    <Drawer>
      <DrawerTrigger>
        <div>{triggerContent}</div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Click on a Component To Add it!</DrawerTitle>
          <DrawerDescription>
            You Will Add Content and Edit the Component later.
          </DrawerDescription>
          <div className="my-10 grid grid-cols-8 gap-5">
            {ComponentList.map((component) => (
              <div key={component.name}>
                <div
                  className="cursor-pointer hover:scale-105 hover:opacity-100 transition duration-500 opacity-80"
                  onClick={() => {
                    if (pageComponents.length === 0) {
                      setPageComponents([{ name: component.name, props: {} }]);
                    } else {
                      if (position === "top") {
                        setPageComponents([
                          { name: component.name, props: {} },
                          ...pageComponents,
                        ]);
                      } else {
                        setPageComponents([
                          ...pageComponents,
                          { name: component.name, props: {} },
                        ]);
                      }
                    }
                  }}
                >
                  <Image
                    className="rounded-md"
                    width={120}
                    height={120}
                    src={component.previewImage}
                    alt={component.name}
                  />
                  <p className="my-5">{component.name}</p>
                </div>
              </div>
            ))}
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <ComponentPickerDrawer triggerContent="Add Up Here" position="top" />
        <IconArrowUp />
      </div>
      <>
        <PageConstructor PageContext={{ Components: pageComponents }} />
      </>
      <div className="flex flex-row">
        <ComponentPickerDrawer
          triggerContent="Add Down Here"
          position="bottom"
        />
        <IconArrowDown />
      </div>
    </div>
  );
}
