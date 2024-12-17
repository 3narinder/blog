import React from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserMNavigationPanel = ({ handleLogout }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <AnimationWrapper
      className="absolute ring-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute -right-8 border border-grey rounded-md w-60  duration-200">
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4 ">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        <Link to={`/user/${user?.username}`} className="link pl-8 py-4">
          profile
        </Link>

        <Link to={`/dashboard/blogs`} className="link pl-8 py-4">
          Dashboard
        </Link>

        <Link to={`//settings/edit-profile`} className="link pl-8 py-4">
          Setting
        </Link>

        <span className="absolute border-t border-grey w-[100%]"></span>

        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={handleLogout}
        >
          <h1 className="font-bold text-xl mg-1">Log Out</h1>

          <p className="text-dark-grey">@{user?.username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserMNavigationPanel;
