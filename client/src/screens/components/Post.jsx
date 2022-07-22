import React from "react";
import { AiFillStar } from "react-icons/ai";

const Post = ({ post }) => {
  return (
    <div className="w-96 flex flex-col mb-10 ">
      <div className="w-96 h-auto overflow-hidden mb-2">
        <img className="w-full h-full rounded-lg object-cover" src={post?.images[0]} alt="" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-center text-red-500 capitalize">
          <div className="mr-4 capitalize">{post?.category[0]}</div>
          <div>{post?.category[1]}</div>
        </div>

        <div className="flex items-center justify-between mx-1">
          <div className="text-xl font-bold cursor-pointer capitalize">{post?.title}</div>
          <div className="flex items-center text-sm text-red-500">
            <AiFillStar className="mr-1" />
            <div>{post?.rating}</div>
          </div>
        </div>
      </div>

      <p className="font-normal text-sm leading-6 text-gray-500 mt-4 overflow-hidden text-ellipsis">
        {post?.content.slice(0, 100) + "..."}
      </p>
    </div>
  );
};

export default Post;
