"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  IconArrowDown,
  IconArrowUp,
  IconCheck,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
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
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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

  return (
    <div className="flex flex-col w-full">
      <div className="w-fit my-5">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Page Actions</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Save{" "}
                <MenubarShortcut>
                  <IconCheck />
                </MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Preview{" "}
                <MenubarShortcut>
                  <IconEye />
                </MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Delete{" "}
                <MenubarShortcut>
                  <IconTrash />
                </MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="flex flex-row">
        <ComponentPickerDrawer triggerContent="Add Up Here" position={0} />
        <IconArrowUp />
      </div>
      <hr className="my-2" />
      <>
        {pageComponents.map((c) => {
          const Component = ComponentList.find((cl) => cl.name === c.name);
          if (!Component) return null;
          return (
            <ContextMenu key={c.name}>
              <ContextMenuTrigger>
                <Component.component {...c.props} />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>
                  <ComponentPickerDrawer
                    triggerContent="Add a Component Above"
                    position={c.position}
                  />
                </ContextMenuItem>
                <ContextMenuItem>
                  <ComponentPickerDrawer
                    triggerContent="Add a Component Below"
                    position={c.position + 1}
                  />
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => {
                    RemoveComponentFromList(c.position);
                  }}
                >
                  Remove Component
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        })}
      </>
      <hr className="my-2" />
      <div className="flex flex-row">
        <ComponentPickerDrawer
          triggerContent="Add Down Here"
          position={
            pageComponents.length === 0
              ? 0
              : pageComponents[pageComponents.length - 1].position + 1
          }
        />
        <IconArrowDown />
      </div>
    </div>
  );
}
