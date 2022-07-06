import Image from "next/image";
import Link from "next/link";
import React from "react";
import LinkButton from "./Buttons/LinkButton";

function NavBar() {
  return (
    <div className=" w-screen px-3 sm:px-6 py-2 flex justify-between md:justify-start border-b-2 md:py-6 md:px-4 md:border-b-0 md:border-r-2 border-gray-200 md:flex-col md:w-28 md:h-full ">
      <div className="w-20 md:w-full hover:cursor-pointer">
        <Link href="/">
          <Image
            src={"/P.png"}
            height={"60px"}
            width={"60px"}
            layout={"responsive"}
            priority={true}
          />
        </Link>
      </div>
      <div className="flex items-center md:flex-col md:mt-5">
        <LinkButton
          href={"/write"}
          text={"Create"}
          styles={" mr-2 xs:mr-4 sm:mr-5 md:mr-0 w-20 md:mb-5 "}
          padding={"p-2"}
          accent={true}
        />
        <LinkButton
          href={"/post"}
          text={"Post"}
          padding={"p-2"}
          styles={" w-20 "}
        />
      </div>
    </div>
  );
}

export default NavBar;
