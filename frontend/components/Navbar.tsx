import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NAV_TITLE } from "@/constants";
import Button from "./Button";

const Navbar = () => {
  return (
    <nav className=" flexBetween max-container padding-container relative z-30 py-5">
      <Link href={"/"}>
        <Image
          src="/reshot-icon-table-tennis-S3YB87ZK5H.svg"
          width={70}
          height={100}
          alt="Logo"
        />
      </Link>
      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_TITLE.map((item) => (
          <Link
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 hover:font-bold transition-all "
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
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
