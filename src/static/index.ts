import Slider1 from "@/assets/images/sliders/1.jpg";
import Slider2 from "@/assets/images/sliders/2.jpg";
import { StaticImageData } from "next/image";

interface ISlider {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
}

export const sliders: ISlider[] = [
  {
    id: 1,
    title: "IU's Top Pick: Premium Wireless Headphones",
    description:
      "Enjoy superior sound quality and comfort with IU's favorite wireless headphones. With rich audio, noise cancellation, and a long battery life, they’re perfect for music, calls, and daily use. Experience your music like never before!",
    image: Slider1,
  },
  {
    id: 2,
    title: "Lisa's Favorite Everyday Tote Bag",
    description:
      "Lisa's go-to tote bag combines style and functionality, featuring a spacious interior, multiple pockets, and a durable design. Perfect for work, travel, or daily errands, it’s the ideal accessory for any occasion!",
    image: Slider2,
  },
];
