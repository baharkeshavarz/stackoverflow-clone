import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface NoResultProps {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: NoResultProps) => {
  return (
    <div className="flex-center mx-auto mt-10 w-full max-w-2xl flex-col gap-6">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No Result Illustration"
        width="270"
        height="200"
        className="block object-contain dark:hidden"
      />

      <Image
        src="/assets/images/dark-illustration.png"
        alt="No Result Illustration"
        width="270"
        height="200"
        className="hidden object-contain dark:flex"
      />

      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="text-dark500_light500 body-regular my-3.5 max-w-md text-center">
        {description}
      </p>

      <Link href={link}>
        <Button className="primary-gradient min-h-[46px] px-4 py-2 text-light-900">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
