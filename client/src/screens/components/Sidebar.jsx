import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="flex self-start flex-col w-1/3 items-center pb-6 rounded-lg bg-gray-100">
      {/* sidebar post */}
      <div className="flex flex-col items-center mt-2">
        <div className="capitalize m-3 p-1 w-4/5 border-y-2 text-center text-lg leading-5 font-semibold">
          about me
        </div>
        <div className="w-96 h-auto mt-4">
          <img
            className="w-full h-full"
            src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
            alt=""
          />
        </div>
        <p className="p-5 text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur accusamus quidem
          sunt nobis, iusto magnam praesentium, quae laborum, animi..............
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-col items-center w-4/5">
        <div className="capitalize m-3 p-1 w-full border-y-2 text-center text-lg leading-5 font-semibold">
          categories
        </div>
        <ul className="mb-5 pl-20 text-base">
          <li className="inline-block w-1/2 mt-4 cursor-pointer">Lifestyle</li>
          <li className="inline-block w-1/2 mt-4 cursor-pointer">Music</li>
          <li className="inline-block w-1/2 mt-4 cursor-pointer">Sports</li>
          <li className="inline-block w-1/2 mt-4 cursor-pointer">Nature</li>
          <li className="inline-block w-1/2 mt-4 cursor-pointer">Tech</li>
          <li className="inline-block w-1/2 mt-4 cursor-pointer">Health</li>
        </ul>
      </div>

      {/* social media Link */}
      <div className="flex flex-col items-center w-4/5">
        <div className="capitalize m-3 p-1 w-full border-y-2 text-center text-lg leading-5 font-semibold">
          follow us:
        </div>
        <ul className="flex items-center justify-center text-2xl">
          <FaFacebookF className="mr-4 text-blue-600" />
          <FaInstagram className="mr-4 text-red-900" />
          <FaTwitter className="mr-4 text-blue-500" />
          <FaYoutube className="text-red-500" />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
