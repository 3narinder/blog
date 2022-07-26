import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../redux/user/user.action";

const Register = () => {
  const dispatch = useDispatch();

  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    let body = { email, password };

    dispatch(loginUser(body));
  };

  const userState = useSelector((state) => state.userState);
  const { userData } = userState;

  return (
    <div>
      <div className="background">
        {userData && <Navigate to="/" />}
        <div className="bg-white  h-auto py-8 md:w-1/3 w-full mx-6 shadow-xl flex flex-col justify-center items-center">
          <span className="text-3xl font-bold">Login</span>
          <form className=" flex flex-col mt-2 w-full px-20">
            <label className="mt-6 mb-2 font-semibold text-lg">Email</label>
            <input
              className="p-3 bg-gray-100 border-none rounded-sm focus:outline-none"
              type="text"
              placeholder="enter your email..."
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
            <label className="mt-6 mb-2 font-semibold text-lg">Password</label>
            <input
              className="p-3 bg-gray-100 border-none rounded-sm focus:outline-none"
              type="password"
              placeholder="Enter your password..."
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />

            <button
              onClick={submitHandler}
              className="mt-6 text-lg font-semibold cursor-pointer bg-red-500 p-3 border-none rounded-xl"
            >
              Login
            </button>

            <p className="mt-4 pl-2 font-medium self-center">New User?</p>

            <div>
              <Link className="block w-full" to="/register">
                <button className="mt-2 w-full text-lg font-semibold cursor-pointer bg-red-500 p-3 border-none rounded-xl">
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
