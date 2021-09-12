import React from "react";
import Image from "next/image";
import styles from "./CommentForm.module.css";
import tw, { styled } from "twin.macro";

const CommentForm = () => {
  return (
    <div tw="flex shadow p-3">
      <div>
        <div tw="relative w-12 h-12 md:w-40 md:h-40">
          <Image
            src="https://placekitten.com/300/300"
            layout="fill"
            objectFit="cover"
            // tw={`rounded`}
          />
        </div>
      </div>

      <div
        tw="bg-white bg-opacity-70 border border-yellow-500 before:bg-yellow-500 rounded shadow ml-4 p-2"
        className={`${styles.commentCursor}`}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
        similique autem eius, quas quisquam in reiciendis doloribus! Delectus,
        ea, nostrum commodi nesciunt quia placeat dolorum veritatis tempore
        veniam dicta quas!
      </div>
    </div>
  );
};

export default CommentForm;
