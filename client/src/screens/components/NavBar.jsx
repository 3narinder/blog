import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/user/user.action";

const Navigation = () => {
  const userState = useSelector((state) => state.userState);
  const { userData } = userState;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="h-16 flex  items-center justify-between px-12 bg-white sticky top-0">
      <div className="flex flex-1  items-center">
        <BsSearch />
        <input
          className="focus:outline-none ml-4 px-2 rounded-lg border-2"
          type="text"
          placeholder="search..."
        />
      </div>
      <ul className="flex flex-grow items-center justify-center text-gray-500 font-semibold text-xl">
        <Link to="/">
          <li className="mr-6">
            <button>Home</button>
          </li>
        </Link>

        <li className="mr-6">
          <button>Authors</button>
        </li>

        <Link to="/addpost">
          <li className="mr-6">
            <button>Add Post</button>
          </li>
        </Link>

        <Link to="/dashboard">
          <li className="mr-6">
            <button>Dashboard</button>
          </li>
        </Link>

        {/* 
        {userData.role === "ADMIN" && (
          <>

          </>           
        )} */}
      </ul>
      <div className="flex items-center justify-end flex-1">
        {userData ? (
          <>
            <div className="w-12 h-12 overflow-hidden mr-4">
              <img
                className="h-full w-full rounded-full object-cover cursor-pointer "
                src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
            </div>

            <div className="text-red-400 text-sm">{userData?.firstName}</div>

            <div className="text-red-400 text-lg">
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </>
        ) : (
          <>
            {" "}
            <Link to="/register">
              <div
                className="text-red-400 text-lg
           mr-2"
              >
                Register
              </div>
            </Link>
            <div className="text-lg font-semibold mr-2">|</div>
            <Link to="/login">
              <div className="text-red-400 text-lg">Login</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
