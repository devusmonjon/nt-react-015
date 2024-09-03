"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { sliders } from "@/static";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const Hero = () => {
  return (
    <section>
      <div className="container">
        <Carousel className="carousel">
          <CarouselPrevious className="carousel-btn left-4 z-10 opacity-0 duration-300 transition-all" />
          <CarouselContent>
            {sliders.map((slider) => (
              <React.Fragment key={slider.id}>
                <CarouselItem className="relative h-[250px] sm:h-[400px] md:h-[550px] w-full p-[50px_100px] flex flex-col justify-end">
                  <Image
                    src={slider.image}
                    fill
                    alt={slider.title}
                    className="object-cover object-left-top w-full h-full -z-10 brightness-50"
                  />
                  <div className="w-[50%] flex flex-col gap-10 mb-16 text-white">
                    <h1 className="text-5xl font-bold">{slider.title}</h1>
                    <p className="text-md">{slider.description}</p>
                  </div>
                  <Button
                    className="bg-primary-foreground text-primary w-min hover:bg-primary hover:text-primary-foreground "
                    onClick={() =>
                      toast.success(slider.title, {
                        description: "Probably nothing",
                        action: {
                          label: "Delete",
                          onClick: () => console.log("delete"),
                        },
                        className:
                          "dark:bg-background dark:text-primary dark:border-border",
                      })
                    }
                  >
                    Shop now
                  </Button>
                </CarouselItem>
              </React.Fragment>
            ))}
          </CarouselContent>
          <CarouselNext className="carousel-btn right-4 opacity-0 duration-300 transition-all" />
        </Carousel>
      </div>
    </section>
  );
};

export default Hero;
