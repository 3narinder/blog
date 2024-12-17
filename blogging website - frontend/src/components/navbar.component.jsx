import { useEffect, useState } from "react";
import logo from "../imgs/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, lookInSession } from "../common/session";
import { setUser, logoutUser } from "../features/auth/authSlice";
import UserMNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const storedUser = lookInSession("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleUserNavPanel = () => {
    setUserNavPanel((curr) => !curr);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 500);
  };

  const handleLogout = () => {
    logout(); // Clears sessionStorage
    dispatch(logoutUser()); // Resets Redux state
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10 h-10">
          <img src={logo} alt="blog logo" className="w-full" />
        </Link>

        <div
          className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ${
            searchBoxVisible === true ? "show" : "hide"
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[-12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            onClick={() => setSearchBoxVisible(!searchBoxVisible)}
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center "
          >
            <i className="fi fi-rr-search text-xl block mt1"></i>
          </button>

          <Link to="/editor" className="hidden md:flex gap-2 link">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>

          {user?.access_token ? (
            <>
              <Link to="/dashboard/notification">
                <button className="bg-grey w-12 h-12 rounded-full hover:bg-black/10 ">
                  <i className="fi fi-rr-bell block mt-1"></i>
                </button>
              </Link>

              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    src={user?.profile_img}
                    alt="user image"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>

                {userNavPanel ? (
                  <UserMNavigationPanel handleLogout={handleLogout} />
                ) : (
                  ""
                )}
              </div>

              <Link
                className="btn-dark py-2 hidden md:flex"
                to="/login"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="/login">
                Log in
              </Link>
            </>
          )}

          <Link className="btn-light py-2 hidden md:flex" to="/signup">
            Sign Up
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
