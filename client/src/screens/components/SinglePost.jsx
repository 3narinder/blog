import Sidebar from "./Sidebar";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../redux/posts/post.action";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const SinglePost = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(deletePost(id));
  // };

  const postsState = useSelector((state) => state.postsState);
  const { singlePost } = postsState;

  return (
    <div className="flex justify-between mt-4 mb-20 mx-10">
      <div className="mr-36 w-3/4">
        <div className="w-full h-1/2 mb-4">
          <img
            className="w-full h-full object-center rounded-md"
            src={singlePost?.images[0]}
            alt=""
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-3xl font-bold capitalize">{singlePost?.title}</div>
          {/* <div className="flex items-center text-xl">
            <BiEdit className="mr-4 text-gray-500" />
            <RiDeleteBin5Fill
              onClick={submitHandler}
              className="text-red-500 cursor-pointer hover:scale-105"
            />
          </div> */}
        </div>

        <div className="flex items-center">
          <div className="text-sm mr-16">
            Author:
            <b className="ml-2">{singlePost?.author}</b>
          </div>
          <span className="flex items-center justify-center text-red-500">
            <AiFillStar className="mr-1" />
            <div>{singlePost?.rating}</div>
          </span>
        </div>
        <p className="font-normal text-sm leading-6 text-gray-500 mt-4 overflow-hidden text-ellipsis">
          {singlePost?.content}
        </p>
      </div>

      <Sidebar />
    </div>
  );
};

export default SinglePost;
