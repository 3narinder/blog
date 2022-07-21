import React from "react";
import Posts from "../screens/components/Posts";
import Sidebar from "../screens/components/Sidebar";

const Home = () => {
  return (
    <div className=" flex justify-between my-4 mx-10">
      <Posts />

      <Sidebar />
    </div>
  );
};

export default Home;
