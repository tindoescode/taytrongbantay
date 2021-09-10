import React from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import tw, { styled } from "twin.macro";

const Card = ({
  href = "#",
  title,
  description,
  category = {},
  thumbnail = "https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium.png",
}) => {
  return (
    <div tw="max-w-md mx-auto my-2 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div tw="md:flex items-center p-2">
        <Link href={href}>
          <a>
            <div tw="relative h-48 md:w-48 m-2 rounded ring-1 ring-green-200">
              <Image
                layout="fill"
                objectFit="cover"
                src={thumbnail}
                alt="thumbnail text"
              />
            </div>
          </a>
        </Link>
        <div tw="p-8">
          <div tw="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {category?.name || <Skeleton />}
          </div>
          <Link href={href}>
            <a tw="block mt-1 text-lg leading-tight font-medium text-black hover:cursor-pointer">
              {title || <Skeleton />}
            </a>
          </Link>
          <p tw="mt-2 text-gray-500 text-xs line-clamp-5">
            {description || <Skeleton />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
