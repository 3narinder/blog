import React from "react";
import { AiFillStar } from "react-icons/ai";

const Post = ({ img }) => {
  return (
    <div className="w-96 flex flex-col mb-10 ">
      <div className="w-96 h-auto overflow-hidden mb-2">
        <img className="w-full h-full rounded-lg object-cover" src={img} alt="" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-center text-red-500">
          <div className="mr-4">Music</div>
          <div>Life</div>
        </div>

        <div className="flex items-center justify-between mx-1">
          <div className="text-xl font-bold cursor-pointer">Lorem ipsum dolor sit amet</div>
          <div className="flex items-center text-sm text-red-500">
            <AiFillStar className="mr-1" />
            <div>5</div>
          </div>
        </div>
      </div>

      <p className="font-normal text-sm leading-6 text-gray-500 mt-4 overflow-hidden text-ellipsis">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda officia architecto
        deserunt deleniti? Labore ipsum aspernatur magnam fugiat, reprehenderit praesentium
        blanditiis quos cupiditate ratione atque, exercitationem quibusdam, reiciendis odio
        laboriosam?
      </p>
    </div>
  );
};

export default Post;
