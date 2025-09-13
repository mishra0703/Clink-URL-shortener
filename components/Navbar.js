"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Linkedin02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="w-full flex justify-between items-center gap-10 h-[10vh] px-20 max-sm:px-5">
        <div>
          <Link href={"/"}>
            <span className="heading-font text-black font-medium text-6xl max-sm:text-4xl">
              C
            </span>
            <span className="heading-font text-black font-medium text-4xl max-sm:text-3xl">
              link
            </span>
          </Link>
        </div>

        <div className="flex gap-10">
          <Link href={'https://github.com/mishra0703'} target="_blank">
            <HugeiconsIcon
              icon={GithubIcon}
              color="black"
              className="hover:scale-120 transition-all ease-in-out duration-300 hover:cursor-pointer"
            />
          </Link>
          <Link href={'https://www.linkedin.com/in/prem-mishra-6b42122a6/'} target="_blank">
            <HugeiconsIcon
              icon={Linkedin02Icon}
              color="black"
              className="hover:scale-120 transition-all ease-in-out duration-300 hover:cursor-pointer"
            />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
