import React from 'react'
import Image from 'next/image'
import styles from './CommentForm.module.css'

const CommentForm = () => {
  return (
    <div className="flex shadow p-3">
      <div>
        <div className="relative w-12 h-12 md:w-40 md:h-40">
          <Image src="https://placekitten.com/300/300"
            layout="fill"
            objectFit="cover" 
            // className={`rounded`}
          />
        </div>

      </div>

      <div className={`ring-1 ring-green-300 ml-4 p-2 ${styles.commentCursor}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit similique autem eius, quas quisquam in reiciendis doloribus! Delectus, ea, nostrum commodi nesciunt quia placeat dolorum veritatis tempore veniam dicta quas!
      </div>

    </div>
  )
}

export default CommentForm
