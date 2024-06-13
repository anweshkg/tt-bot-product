import Image from "next/image";
import React from "react";

export default function BackgroundHero() {
  return (
    <div  className="relative bg-black min-h-[90vh]">
      <Image
        src={"/herobg.png"}
        alt=""
        width={1440}
        height={880}
        className="absolute z-0 h-full w-full"
      />
      <Image
        src={"/herobot.png"}
        alt=""
        width={1420}
        height={980}
        className="absolute z-20 ml-[50vh] h-full"
      />
      <Image
        src={"/herorectangle.png"}
        alt=""
        width={1440}
        height={680}
        className="absolute z-10 h-full right-0"
      />
    </div>
  );
}
