import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navigation = () => {
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

        <Link to="/addpost">
          <li className="mr-6">
            <button>Add Post</button>
          </li>
        </Link>

        <li className="mr-6">
          <button>Authors</button>
        </li>
        <li className="mr-6">
          <button>Latest</button>
        </li>
      </ul>

      <div className="flex items-center justify-end flex-1">
        <div className="w-12 h-12 overflow-hidden mr-4">
          <img
            className="h-full w-full rounded-full object-cover cursor-pointer "
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
        </div>
        <div className="text-red-400 text-lg">Logout</div>
      </div>
    </div>
  );
};

export default Navigation;
