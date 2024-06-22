"use client";

import React from "react";
import { Button } from "../ui/button";
import { IconCheck, IconEye, IconTrash } from "@tabler/icons-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

export interface PageContext {
  Components:
    | {
        name: string;
        props: any;
        position: number;
      }[]
    | [];
}

export default function PageBuilder({ slug }: { slug?: string }) {
  const [pageComponents, setPageComponents] = React.useState<
    PageContext["Components"]
  >([
    {
      position: 0,
      name: "DialogBox",
      props: { editFlag: true },
    },
  ]);
  const ComponentPickerDrawer = ({
    triggerContent,
    position,
  }: {
    triggerContent: string;
    position: number;
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
                      setPageComponents([
                        {
                          name: component.name,
                          props: { editFlag: true },
                          position: 0,
                        },
                      ]);
                    } else {
                      setPageComponents((prevComponents) => {
                        const newComponents = [...prevComponents];
                        newComponents.splice(position, 0, {
                          name: component.name,
                          props: { editFlag: true },
                          position: position,
                        });
                        for (
                          let i = position + 1;
                          i < newComponents.length;
                          i++
                        ) {
                          newComponents[i].position += 1;
                        }
                        return newComponents;
                      });
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
  const [selectedComponent, setSelectedComponent] = React.useState<
    number | null
  >(null);

  function RemoveComponentFromList(index: number) {
    setPageComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      newComponents.splice(index, 1);
      for (let i = index; i < newComponents.length; i++) {
        newComponents[i].position -= 1;
      }
      return newComponents;
    });
  }

  const BuilderNavbar = () => (
    <div className="flex flex-col gap-3">
      <hr />
      <p>
        You Have Selected{" "}
        {pageComponents.find((c) => c.position === selectedComponent)?.name ||
          "No Component"}
      </p>
      <hr />
      {selectedComponent !== null && (
        <div className="flex flex-col gap-3">
          <Button>
            <ComponentPickerDrawer
              triggerContent="Add a Component Above"
              position={selectedComponent ? selectedComponent : 0}
            />
          </Button>
          <Button>
            <ComponentPickerDrawer
              triggerContent="Add a Component Below"
              position={selectedComponent ? selectedComponent + 1 : 0}
            />
          </Button>
          <Drawer>
            <Button>
              <DrawerTrigger>Edit Component Content</DrawerTrigger>
            </Button>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit Component Content</DrawerTitle>
                <DrawerDescription>
                  Use The Tools and Fields Below To Edit The Component Content.
                </DrawerDescription>
                Edit
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-3 dark:bg-slate-900 p-2 rounded-md">
        <Sheet>
          <SheetTrigger className="bg-slate-500 w-fit text-white p-3 rounded-md hover:bg-slate-600 transition duration-1000">
            Builder Tools
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Page Builder Tools</SheetTitle>
              <BuilderNavbar />
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="bg-slate-500 w-fit text-white p-3 rounded-md hover:bg-slate-600 transition duration-1000">
          <ComponentPickerDrawer
            triggerContent="Add a New Component"
            position={
              pageComponents.length === 0 ? 0 : pageComponents.length + 1
            }
          />
        </div>
        <div className="bg-slate-500 w-fit text-white p-3 rounded-md hover:bg-slate-600 transition duration-1000">
          Save Page
        </div>
        <div className="bg-slate-500 w-fit text-white p-3 rounded-md hover:bg-slate-600 transition duration-1000">
          Preview Page
        </div>
        <div className="bg-slate-500 w-fit text-white p-3 rounded-md hover:bg-slate-600 transition duration-1000">
          Delete Page
        </div>
      </div>
      {pageComponents.map((c) => {
        const Component = ComponentList.find((cl) => cl.name === c.name);
        if (!Component) return null;
        return (
          <div
            key={c.position}
            className="cursor-pointer"
            onClick={() => setSelectedComponent(c.position)}
          >
            <Component.component {...c.props} />
          </div>
        );
      })}
    </div>
  );
}
