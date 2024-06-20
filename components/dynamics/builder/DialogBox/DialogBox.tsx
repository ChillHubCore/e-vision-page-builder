import React from "react";
import DialogBoxInput from "./DialogBoxInput";
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
import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function DialogBox({
  editFlag,
  content,
}: {
  editFlag?: boolean;
  content?: string;
}) {
  const DialogBoxEditor = () => (
    <Drawer>
      <DrawerTrigger>
        <IconEdit />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Component Content</DrawerTitle>
          <DrawerDescription>
            Use The Tools and Fields Below To Edit The Component Content.
          </DrawerDescription>
          <DialogBoxInput />
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
    <>
      {editFlag ? (
        <div className="my-2 flex flex-col">
          <div className="flex flex-row justify-between">
            <DialogBoxEditor />
          </div>
          <hr className="my-2" />
        </div>
      ) : null}
      <div
        dangerouslySetInnerHTML={{
          __html: content
            ? content
            : "<p>This is a Dialog Box Component Click on Edit Button To Make Changes!</p>",
        }}
      />
    </>
  );
}
