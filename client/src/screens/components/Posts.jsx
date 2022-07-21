import React from "react";
import Post from "../components/Post";

import { Link } from "react-router-dom";

const Posts = () => {
  return (
    <div>
      <div className="w-full flex justify-between pr-36 flex-wrap">
        <Link to="/singlepost">
          <Post img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
        </Link>

        <Link to="/singlepost">
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
        </Link>
      </div>
    </div>
  );
};

export default Posts;
