"use client";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section
      className="background-light900_dark200 custom-scrollbar sticky left-0 top-0 flex
            h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 
            shadow-light-300 dark:shadow-none max-sm:hidden
            lg:w-[266px]"
    >
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          // Show the link in case that user is logged in
          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-2`}
            >
              <Image
                src={item.imgURL}
                width={20}
                height={20}
                alt={item.label}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : ""} max-lg:hidden`}>
                {item.label}
              </p>
            </Link>
          );
        })}

        <SignedOut>
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                width={20}
                height={20}
                className="invert-colors"
                alt="login"
              />
              <span className="primary-text-gradient ml-2 max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium btn-tertiary light-border-2 text-dark500_light500 mt-3 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                width={20}
                height={20}
                className="invert-colors"
                alt="SignUp"
              />
              <span className="ml-2 max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSidebar;
