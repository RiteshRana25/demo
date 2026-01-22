"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function AmbulanceCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      let position = -100;

      const interval = setInterval(() => {
        position += 2;
        if (position > window.innerWidth) {
          position = -100;
        }
        container.style.transform = `translateX(${position}px)`;
      }, 30);

      return () => clearInterval(interval);
    };

    animate();
  }, []);

  return (
    <div className="w-full h-[60px] h-md-[120px] overflow-hidden relative bg-transparent">
      <div
        ref={containerRef}
        className="absolute top-0 left-0 h-full flex items-center"
        style={{
          width: "100px",
          willChange: "transform",
        }}
      >
        <Image
          src="/ambulance_icon.webp"
          alt="Ambulance"
          width={50}
          height={60}
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
