import React from "react";
import Post from "../components/Post";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/posts/post.action";

import { Link } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const postsState = useSelector((state) => state.postsState);
  const { posts } = postsState;
  return (
    <div>
      <div className="w-full flex justify-between pr-36 flex-wrap">
        {posts?.map((post) => (
          <Link to={`/singlepost/${post._id}`}>
            <Post post={post} />
          </Link>
        ))}

        {/* <Link to="/singlepost">
          <Post img="https://images.pexels.com/photos/6758029/pexels-photo-6758029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        </Link>
        <Link to="/singlepost">
          <Post img="https://images.pexels.com/photos/6711867/pexels-photo-6711867.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        </Link>
        <Link to="/singlepost">
          <Post img="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        </Link>
        <Link to="/singlepost">
          <Post img="https://images.pexels.com/photos/4916559/pexels-photo-4916559.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        </Link> */}
      </div>
    </div>
  );
};

export default Posts;
