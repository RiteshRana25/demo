"use client";

export default function EcgLine() {
  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox="0 0 800 100"
        className="w-full h-[60px]"
        fill="none"
      >
         <path
      d="
        M 0 40
        L 60 40

        L 66 36
        L 70 40
        L 74 40
        L 78 18
        L 82 42
        L 86 62
        L 90 41

        L 130 40

        L 136 34
        L 140 41
        L 144 39
        L 148 21
        L 152 44
        L 156 58
        L 160 41

        L 200 40

        L 206 33
        L 210 42
        L 214 40
        L 218 17
        L 222 45
        L 226 63
        L 230 42

        L 280 40

        L 286 35
        L 290 41
        L 294 39
        L 298 22
        L 302 43
        L 306 57
        L 310 41

        L 360 40

        L 366 34
        L 370 41
        L 374 39
        L 378 20
        L 382 44
        L 386 60
        L 390 42

        L 440 40
        L 480 40

        L 486 36
        L 490 42
        L 494 40
        L 498 18
        L 502 45
        L 506 62
        L 510 43

        L 560 40

        L 566 33
        L 570 41
        L 574 39
        L 578 23
        L 582 44
        L 586 56
        L 590 41

        L 640 40

        L 646 35
        L 650 42
        L 654 40
        L 658 19
        L 662 45
        L 666 60
        L 670 42

        L 720 40
        L 800 40
      "
      className="
      ecg-path
      "
    />

      </svg>
    </div>
  );
}
