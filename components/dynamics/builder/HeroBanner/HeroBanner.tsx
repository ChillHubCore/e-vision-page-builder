import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroBanner({
  content,
  styles,
}: {
  content?: {
    title: string;
    items: {
      header: string;
      image: string;
      description: string;
      link: string;
    }[];
  };
  styles?: {
    containerClassName: string;
    titleClassName: string;
    itemClassName: string;
    imgClassName: string;
    descriptionClassName: string;
    headerClassName: string;
    orientation: "horizontal" | "vertical";
  };
}) {
  return (
    <Carousel
      className={cn(
        "flex flex-col justify-center items-center",
        styles?.containerClassName
      )}
    >
      <h1
        className={cn(
          "text-center my-5 font-bold text-3xl",
          styles?.titleClassName
        )}
      >
        {content?.title || "This is Hero Banner Component"}
      </h1>
      <CarouselContent className="w-screen">
        {content?.items.map((item, index) => (
          <CarouselItem
            className={cn(
              "dark:bg-slate-800 bg-slate-200",
              styles?.itemClassName
            )}
            key={index}
          >
            <p
              className={cn(
                "text-3xl my-5 font-bold h-12 overflow-y-scroll text-center",
                styles?.headerClassName
              )}
            >
              {item.header}
            </p>

            <div
              className={`flex flex-${
                styles?.orientation === "horizontal"
                  ? "row"
                  : "col justify-between w-full items-center"
              }`}
            >
              <Image
                src={item.image}
                alt={item.description}
                width={1200}
                height={200}
                style={{ objectFit: "contain" }}
                className={cn(
                  "rounded-lg p-10 w-full h-96 overflow-y-hidden",
                  styles?.imgClassName
                )}
              />

              <div
                className={`my-8 gap-5 flex flex-${
                  styles?.orientation === "horizontal" ? "col" : "row"
                } justify-between w-full px-16 dark:bg-slate-700 p-5 mr-${
                  styles?.orientation === "horizontal" ? "3" : "0"
                } rounded-lg`}
              >
                <p
                  className={cn(
                    `h-${
                      styles?.orientation === "horizontal" ? "48" : "40"
                    } overflow-y-scroll`,
                    styles?.descriptionClassName
                  )}
                >
                  {item.description}
                </p>

                <Link href={item.link} className="flex flex-col justify-end">
                  <Button>Learn More!</Button>
                </Link>
              </div>
            </div>
          </CarouselItem>
        )) || "Add items in the Builder"}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
