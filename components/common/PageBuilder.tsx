"use client";

import React from "react";
import { Button } from "../ui/button";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  >([]);

  //define save functions for each component

  const ComponentsSaveFunctions = [
    {
      name: "DialogBox",
      saveFunction: function SaveDialogBox(values: { content: string }) {
        setPageComponents((prevComponents) => {
          const newComponents = [...prevComponents];
          const dialogBoxIndex = newComponents.findIndex(
            (c) => c.name === "DialogBox" && c.position === selectedComponent
          );
          if (dialogBoxIndex !== -1) {
            newComponents[dialogBoxIndex].props.content = values.content;
          }
          return newComponents;
        });
      },
    },
  ];
  //define save functions for each component

  const ComponentPickerDrawer = ({
    triggerContent,
    position,
    className,
  }: {
    triggerContent: string;
    position: number;
    className?: string;
  }) => (
    <Drawer>
      <DrawerTrigger>
        <div className={className || ""}>{triggerContent}</div>
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
                          props: {},
                          position: 0,
                        },
                      ]);
                    } else if (position === pageComponents.length) {
                      setPageComponents((prevComponents) => [
                        ...prevComponents,
                        {
                          name: component.name,
                          props: {},
                          position: position,
                        },
                      ]);
                    } else {
                      setPageComponents((prevComponents) => {
                        const newComponents = [...prevComponents];
                        newComponents.splice(position, 0, {
                          name: component.name,
                          props: {},
                          position: position,
                        });
                        for (
                          let i = position + 1;
                          i < newComponents.length;
                          i++
                        ) {
                          newComponents[i].position = i;
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
          <DrawerClose>Close</DrawerClose>
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
      setSelectedComponent(null);
      return newComponents;
    });
  }

  const RenderComponentEditor = () => {
    const SelectedComponent = pageComponents.find(
      (c) => c.position === selectedComponent
    );
    const Component = ComponentList.find(
      (c) => c.name === SelectedComponent?.name
    );
    if (!Component) return null;
    return (
      <Component.editor
        previousContent={SelectedComponent?.props.content}
        onSave={
          ComponentsSaveFunctions.find((c) => c.name === Component.name)
            ?.saveFunction
        }
      />
    );
  };

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
          Selected Position is {selectedComponent}
          <ComponentPickerDrawer
            triggerContent="Add a Component Above"
            position={selectedComponent}
            className="bg-slate-500 text-white p-3 rounded-md hover:bg-slate-600 transition duration-1000"
          />
          <ComponentPickerDrawer
            triggerContent="Add a Component Below"
            position={selectedComponent + 1}
            className="bg-slate-500 text-white p-3 rounded-md hover:bg-slate-600 transition duration-1000"
          />
          <RenderComponentEditor />
          <Button onClick={() => RemoveComponentFromList(selectedComponent)}>
            Remove This Component
          </Button>
        </div>
      )}
    </div>
  );

  // console.log(pageComponents);

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
            position={pageComponents.length}
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
      <div>
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
    </div>
  );
}
