import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost } from "../redux/posts/post.action";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect((e) => {
    dispatch(getPosts());
  }, []);

  const deleteHandler = (id) => {
    dispatch(deletePost(id));
  };

  const postsState = useSelector((state) => state.postsState);
  const { posts } = postsState;

  return (
    <>
      {posts?.map((post) => (
        <div className="flex justify-between items-start mb-6 md:gap-6 bg-white py-4 px-6 rounded-lg ">
          <div className="flex flex-col gap-2">
            <span>{post?._id}</span>
          </div>

          <div>
            <span className=" w-12 h-auto">
              <img className="h-12 w-12" src={post?.images[0]} alt="sport" />
            </span>
          </div>

          <div>
            <p className="capitalize">{post?.title.slice(0, 16) + "..."}</p>
          </div>

          <div>
            <p className="capitalize">{post?.content.slice(0, 80) + "..."}</p>
          </div>

          <div>
            <p>{post?.author}</p>
          </div>

          <div className="flex justify-between items-center gap-4">
            <FiEdit className="text-xl text-gray-700 cursor-pointer" />
            <MdOutlineDeleteOutline
              onClick={() => deleteHandler(post._id)}
              className="text-2xl text-gray-700 cursor-pointer"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Dashboard;
