"use client";

import AliceCarousel from "react-alice-carousel";
import Image from "next/image";
import "react-alice-carousel/lib/alice-carousel.css";

export default function AmbulanceAliceCarousel() {
  const items = [
  <div key="1" className="relative w-full h-[90px] overflow-hidden">
      <Image
        src="/ambulance_icon.webp"
        alt="Ambulance"
        width={50}
        height={90}
        priority
      />
  </div>,

  <div key="2" className="w-full h-[90px]" />,
];

  return (
    <AliceCarousel
      items={items}
      infinite
      autoPlay
      autoPlayDirection="rtl"
      autoPlayInterval={0}
      animationDuration={11000}
      animationType="slide"
      disableDotsControls
      disableButtonsControls
      mouseTracking={false}
      touchTracking={false}
    />
  );
}
