import Image from "next/image";
import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py:20 xl:flex-row ">
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image
          src={"/camp.svg"}
          width={50}
          height={50}
          alt="camp"
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        />
        <h1 className="bold-52 uppercase lg:bold-88">Playbotics</h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px] ">
          Our Table Tennis Trainer personalizes pro-level drills for all, making
          you a table tennis force without breaking the bank. Train smart, train
          affordable!
        </p>

        <div className="my-4 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src={"/star.svg"}
                  width={24}
                  height={24}
                  alt="star img"
                  key={index}
                />
              ))}
          </div>
          <p className="bold-16 lg:bold-20 text-blue-70">
            200+
            <span className="regular-16 lg:regular-20 ml-1"> Reviews</span>
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <Button
            type="button"
            title="Download App"
            variant="btn_green"
          ></Button>
          <Button
            type="button"
            title="How We Work "
            variant="btn_white_text"
            icon="/play.svg"
          ></Button>
        </div>
      </div>
      <div className="relative flex flex-1 items-start ">
        <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8">
          <div className="flex flex-col">
            <div className="flexBetween">
              <p className="regular-16 text-gray-20">Location</p>
              <Image src={"/close.svg"} alt="close" width={24} height={24} />
            </div>
            <p className="bold-20 text-white">Custom Bot v1</p>
          </div>

          <div className="flexBetween">
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Distance</p>
              <p className="bold-20 text-white">139km</p>
            </div>

            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Elevation</p>
              <p className="bold-20 text-white">2.009km</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
