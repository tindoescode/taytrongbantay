import React from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'

const PostCard = ( { title, description, category = "Tổng hợp", thumbnail = "https://taxreform.dof.gov.ph/wp-content/uploads/2019/07/no-thumbnail-medium.png" } ) => {
  return (
    <div className="max-w-md mx-auto my-5 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image layout="responsive" width={50} height={50} className="h-48 w-full object-cover md:w-48" src={thumbnail} alt="thumbnail text" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{category}</div>
          <a onClick={() => toast('Đang cập nhật...')} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{title}</a>
          <p className="mt-2 text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard
