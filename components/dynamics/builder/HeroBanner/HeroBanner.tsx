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

export default function HeroBanner({
  content,
  styles,
}: {
  content?: {
    title: string;
    items: {
      image: string;
      description: string;
    }[];
  };
  styles?: {
    containerClassName: string;
    titleClassName: string;
    itemClassName: string;
    imgClassName: string;
    descriptionClassName: string;
    imgWidth: number;
    imgHeight: number;
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
      <CarouselContent>
        {content?.items.map((item, index) => (
          <CarouselItem
            className={cn(
              `flex flex-${
                styles?.orientation === "horizontal" ? "row" : "col"
              } items-center justify-${
                styles?.orientation === "horizontal" ? "between" : "center"
              } dark:bg-slate-800 bg-slate-200`,
              styles?.itemClassName
            )}
            key={index}
          >
            <div className="w-full flex flex-row justify-center">
              <Image
                src={item.image}
                alt={item.description}
                width={styles?.imgWidth || 1200}
                height={styles?.imgHeight || 300}
                // style={{ objectFit: "contain" }}
                className={cn("rounded-md", styles?.imgClassName)}
              />
            </div>

            <p
              className={cn(
                "my-4 text-2xl font-semibold",
                styles?.descriptionClassName
              )}
            >
              {item.description}
            </p>
          </CarouselItem>
        )) || "Add items in the Builder"}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
