"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="relative">
      <div className="relative w-full h-screen">
        <Image
          src={isMobile ? "/ComingSoon.jpg" : "/ComingSoon1.jpg"}
          alt="Coming Soon"
          width={2000}
          height={3000}
          className="
          w-full 
          h-screen
          object-fit
        "
        />
      </div>
      {/* <div className="absolute top-125 right-0 left-0 flex flex-col items-center gap-3">
        <form className="flex items-center rounded-xl bg-white/10 backdrop-blur-md p-1 shadow-[0_0_25px_rgba(0,140,255,0.35)]">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-[260px] bg-transparent px-5 py-3 text-sm text-black placeholder-black/70 outline-none"
          />

          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_15px_rgba(0,140,255,0.8)] hover:-translate-y-[1px]"
          >
            Notify Me
          </button>
        </form>
      </div> */}
    </div>
  );
}
