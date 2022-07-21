import { BsSearch } from "react-icons/bs";

const Navigation = () => {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <BsSearch />
        <input type="text" placeholder="search..." />
      </div>

      <ul className="flex items-center bg-gray-100">
        <li>
          <button>Home</button>
        </li>
        <li>
          <button>Add Post</button>
        </li>
        <li>
          <button>Authors</button>
        </li>
        <li>
          <button>Login</button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
