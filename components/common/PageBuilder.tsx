"use client";

import React, { Suspense } from "react";
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
import tempImg from "@/assests/images/components/dynamics/HeroBanner.gif";
import tempImg2 from "@/assests/images/components/dynamics/BannerSize.png";
import { HeroBannerProps } from "../dynamics/builder/HeroBanner/HeroBanner";

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
      name: "TitleBox",
      props: {
        content: {
          text: "This is a Title Box",
          order: "1",
        },
        styles: "text-center",
      },
      position: 0,
    },
  ]);

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
    {
      name: "HeroBanner",
      saveFunction: function SaveHeroBanner(values: HeroBannerProps) {
        setPageComponents((prevComponents) => {
          const newComponents = [...prevComponents];
          const heroBannerIndex = newComponents.findIndex(
            (c) => c.name === "HeroBanner" && c.position === selectedComponent
          );
          if (heroBannerIndex !== -1) {
            newComponents[heroBannerIndex].props.content = values.content;
            newComponents[heroBannerIndex].props.styles = values.styles;
          }
          return newComponents;
        });
      },
    },
    {
      name: "TitleBox",
      saveFunction: function SaveTitleBox(values: {
        content: { text: string; order: string };
        styles: string;
      }) {
        setPageComponents((prevComponents) => {
          const newComponents = [...prevComponents];
          const titleBoxIndex = newComponents.findIndex(
            (c) => c.name === "TitleBox" && c.position === selectedComponent
          );
          if (titleBoxIndex !== -1) {
            newComponents[titleBoxIndex].props.content = values.content;
            newComponents[titleBoxIndex].props.styles = values.styles;
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
              <div
                key={component.name}
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
                <div
                  className="cursor-pointer hover:scale-105 hover:opacity-100 transition duration-500 opacity-80"
                  style={{
                    width: 120,
                    height: 120,
                  }}
                >
                  <Image
                    className="rounded-md"
                    width={120}
                    height={120}
                    src={component.previewImage}
                    alt={component.name}
                  />
                </div>
                <p
                  className="my-5 cursor-pointer"
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
                  {component.name}
                </p>
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
      <Suspense>
        <Component.editor
          previousContent={SelectedComponent?.props.content}
          previousStyles={SelectedComponent?.props.styles}
          onSave={
            ComponentsSaveFunctions.find((c) => c.name === Component.name)
              ?.saveFunction
          }
        />
      </Suspense>
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
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row gap-3 dark:bg-slate-900 p-2 rounded-md w-80 sm:w-full overflow-x-scroll">
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
              <Suspense>
                <Component.component {...c.props} />
              </Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
}
