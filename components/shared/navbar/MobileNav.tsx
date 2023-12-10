"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pb-8 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <SheetClose asChild key={item.label}>
            <Link
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
              <p className={`${isActive ? "base-bold" : ""}`}>{item.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/assets/icons/hamburger.svg"
            width={36}
            height={36}
            alt="Manu"
            className="invert-colors sm:hidden"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="background-light900_dark200 border-none"
        >
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/assets/images/site-logo.svg"
              width={23}
              height={23}
              alt="DevFlow"
            />
            <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
              Dev <span className="text-primary-500">Overflow</span>
            </p>
          </Link>
          <div>
            <SheetClose asChild>
              <NavContent />
            </SheetClose>

            <SignedOut>
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium btn-tertiary light-border-2 text-dark500_light500 mt-3 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
