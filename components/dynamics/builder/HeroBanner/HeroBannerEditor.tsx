"use client";

import React from "react";
import { z } from "zod";
import { HeroBannerProps } from "./HeroBanner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import useUpload from "@/lib/hooks/useUpload";

const formSchema = z.object({
  content: z.object({
    title: z.string(),
    items: z.array(
      z.object({
        header: z.string(),
        image: z.string(),
        description: z.string(),
        link: z.string(),
      })
    ),
  }),
  styles: z.object({
    containerClassName: z.string(),
    titleClassName: z.string(),
    itemClassName: z.string(),
    imgClassName: z.string(),
    descriptionClassName: z.string(),
    headerClassName: z.string(),
    orientation: z.enum(["horizontal", "vertical"]),
  }),
});

interface ContentItemProps {
  header: string;
  image: string;
  description: string;
  link: string;
}

export default function HeroBannerEditor({
  onSave,
  previousContent,
  previousStyles,
}: {
  onSave?: any;
  previousContent?: HeroBannerProps["content"];
  previousStyles?: HeroBannerProps["styles"];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: previousContent || {
        title: "Write a Title Here!",
        items: [] as HeroBannerProps["content"]["items"],
      },
      styles: previousStyles || {
        containerClassName: "",
        titleClassName: "",
        itemClassName: "",
        imgClassName: "",
        descriptionClassName: "",
        headerClassName: "",
        orientation: "vertical",
      },
    },
  });

  const [contentItem, setContentItem] = React.useState<ContentItemProps>({
    header: "",
    image: "",
    description: "",
    link: "",
  });
  const uploadHandle = useUpload();
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
  }, [refresh]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submit called");
    if (onSave) {
      onSave(values);
    }
  }
  function AddNewItem(item: ContentItemProps) {
    if (!form.getValues("content.items").includes(item)) {
      form.setValue("content.items", [
        ...form.getValues("content.items"),
        item,
      ]);
      form.trigger("content.items");
      setRefresh(true);
    } else {
      toast({
        title: "Item Already Exists",
        color: "#b14b4bcc3",
        description: "This item already exists in the list!",
      });
    }
  }
  function UpdateItem(item: ContentItemProps) {
    form.setValue("content.items", [
      ...form.getValues("content.items").map((i) => {
        if (i.header === item.header) {
          return item;
        }
        return i;
      }),
    ]);
    form.trigger("content.items");
    form.register("content.items");
  }
  const RenderAddItemDialog = (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          setContentItem({
            header: "",
            image: "",
            description: "",
            link: "",
          });
        }}
        className="bg-slate-500 w-fit text-white p-3 rounded-md hover:bg-slate-600 transition duration-1000"
      >
        Add an Item
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add Item</DialogHeader>
        <Input
          placeholder="Write a Header For The Item"
          value={contentItem.header}
          onChange={(event) => {
            setContentItem({
              ...contentItem,
              header: event.target.value,
            });
          }}
        />
        <Image
          src={contentItem.image}
          alt={contentItem.header}
          width={100}
          height={100}
        />
        <Input
          type="file"
          placeholder="Choose an Image To Upload"
          // value={contentItem.image}
          onChange={(event) => {
            if (event.target.files) {
              uploadHandle.sendFile(
                "/upload",
                event.target.files[0],
                "Image Uploaded Successfully",
                "Error Uploading Image",
                (url) => {
                  setContentItem({
                    description: contentItem.description,
                    header: contentItem.header,
                    link: contentItem.link,
                    image: url,
                  });
                }
              );
            }
          }}
        />
        <Textarea
          placeholder="Write a Description"
          value={contentItem.description}
          onChange={(event) => {
            setContentItem({
              ...contentItem,
              description: event.target.value,
            });
          }}
        />
        <Input
          value={contentItem.link}
          placeholder="Write a Link"
          onChange={(event) => {
            setContentItem({
              ...contentItem,
              link: event.target.value,
            });
          }}
        />

        <Button
          className="w-fit"
          onClick={() => {
            AddNewItem(contentItem);
          }}
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
  const RenderItems = form
    .getValues("content.items")
    .map((item: ContentItemProps) => (
      <Dialog key={item.header}>
        <DialogTrigger
          onClick={() => {
            setContentItem(item);
          }}
          className="cursor-pointer hover:scale-125 opacity-50 hover:opacity-100 transition duration-1000"
        >
          <Image
            src={item.image}
            alt={item.header}
            width={50}
            height={50}
            objectFit="contain"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Edit Item {item.header}</DialogHeader>

          <Input
            placeholder="Write a Header For The Item"
            value={contentItem.header}
            onChange={(event) => {
              setContentItem({
                ...contentItem,
                header: event.target.value,
              });
            }}
          />
          <Image src={item.image} alt={item.header} width={100} height={100} />
          <Input
            type="file"
            placeholder="Choose an Image To Upload"
            // value={contentItem.image}
            onChange={(event) => {
              if (event.target.files) {
                uploadHandle.sendFile(
                  "/upload",
                  event.target.files[0],
                  "Image Uploaded Successfully",
                  "Error Uploading Image",
                  (url) => {
                    setContentItem({
                      ...contentItem,
                      image: url,
                    });
                  }
                );
              }
            }}
          />
          <Textarea
            placeholder="Write a Description"
            value={contentItem.description}
            onChange={(event) => {
              setContentItem({
                ...contentItem,
                description: event.target.value,
              });
            }}
          />
          <Input
            value={contentItem.link}
            placeholder="Write a Link"
            onChange={(event) => {
              setContentItem({
                ...contentItem,
                link: event.target.value,
              });
            }}
          />
          <div className="flex flex-row gap-5">
            <Button
              className="w-fit"
              onClick={() => {
                UpdateItem(contentItem);
              }}
            >
              Save Updates
            </Button>
            <Button
              className="w-fit"
              onClick={() => {
                form.setValue(
                  "content.items",
                  form.getValues("content.items").filter((i) => i !== item)
                );
                form.register("content.items", {
                  value: form.getValues("content.items"),
                });
                setRefresh(true);
              }}
            >
              Delete Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    ));
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col gap-3 overflow-y-scroll h-96"
        >
          <FormField
            control={form.control}
            name="content.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Title</FormLabel>
                <FormControl>
                  <Input placeholder="Write a Title" {...field} />
                </FormControl>
                <FormDescription>
                  The title of the hero banner component.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {RenderAddItemDialog}
          <div className="grid grid-cols-5 gap-5">{RenderItems}</div>
          <div>
            <p>Component Styles</p>
            <FormField
              control={form.control}
              name="styles.containerClassName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Container Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Container Class Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The class name for the container of the component.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="styles.titleClassName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Title Class Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The class name for the title of the component.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="styles.itemClassName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Class Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The class name for the item of the component.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="styles.imgClassName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Image Class Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The class name for the image of the component.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="styles.descriptionClassName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Description Class Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The class name for the description of the component.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="styles.headerClassName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Header Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Header Class Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The class name for the header of the component.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="styles.orientation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Orientation</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="horizontal">Horizontal</option>
                      <option value="vertical">Vertical</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    The orientation of the component.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            onClick={() => {
              onSubmit(form.getValues());
            }}
            className="w-fit"
            // type="submit"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
