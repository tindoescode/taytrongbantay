import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton';

const PostCard = ( { href = '#', title, description, category = "Tổng hợp", thumbnail = "https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium.png" } ) => {
  return (
    <div className="max-w-md mx-auto my-5 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex items-center">
        <div className="md:flex-shrink-0 flex items-center m-2 rounded ring-1 ring-green-200">
          <img className="h-48 w-full object-cover md:w-48" src={thumbnail} alt="thumbnail text" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{category || <Skeleton />}</div>
          <Link href={href}><a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title || <Skeleton /> }</a></Link>
          <p className="mt-2 text-gray-500">{description || <Skeleton />}</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard
