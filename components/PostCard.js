import React from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const PostCard = ({
  href = "#",
  title,
  description,
  category = {},
  thumbnail = "https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium.png",
}) => {
  return (
    <div className="max-w-md mx-auto my-2 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex items-center p-2">
        <Link href={href}>
          <a>
            <div className="relative h-48 w-full md:w-48 md:flex-shrink-0 m-2 rounded ring-1 ring-green-200">
              <Image
                layout="fill"
                objectFit="cover"
                src={thumbnail}
                alt="thumbnail text"
              />
            </div>
          </a>
        </Link>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {category?.name || <Skeleton />}
          </div>
          <Link href={href}>
            <a className="block mt-1 text-lg leading-tight font-medium text-black">
              {title || <Skeleton />}
            </a>
          </Link>
          <p className="mt-2 text-gray-500 text-xs line-clamp-5">
            {description || <Skeleton />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
