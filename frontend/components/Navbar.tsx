import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NAV_TITLE } from "@/constants";
import Button from "./Button";

const Navbar = ({
  lightModeColor = "text-gray-900",
  darkModeColor = "dark:text-gray-10",
}) => {
  return (
    <nav className="flex items-center justify-between pr-10 pl-10 relative z-30 py-5">
      <Link href={"/"}>
        <Image
          // src="/reshot-icon-table-tennis-S3YB87ZK5H.svg"
          src="/logofotfun.png"
          width={150}
          height={100}
          alt="Logo"
        />
      </Link>
      <ul className="hidden h-full gap-24 lg:flex">
        {NAV_TITLE.map((item) => (
          <Link
            className={`text-[18px] font-[400] ${lightModeColor} ${darkModeColor} flexCenter cursor-pointer pb-1.5 hover:font-bold transform hover:-translate-y-1 transition-all duration-400`}
            href={item.href}
            key={item.key}
          >
            {item.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        <Button
          type="button"
          title="Login"
          icon="/user.svg"
          variant="btn_dark_green"
        />
      </div>

      <Image
        src={"menu.svg"}
        alt="menu"
        width={24}
        height={24}
        className="inline-block cursor-pointer lg:hidden dark:invert"
      />
    </nav>
  );
};

export default Navbar;
