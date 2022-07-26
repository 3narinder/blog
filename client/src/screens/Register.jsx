import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../redux/user/user.action";

const Register = () => {
  const dispatch = useDispatch();

  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    let body = { firstName, lastName, email, password };

    dispatch(registerUser(body));
  };

  const userState = useSelector((state) => state.userState);
  const { userData, error } = userState;

  return (
    <div>
      <div className="background">
        {userData && <Navigate to="/" />}
        <div className="bg-white  h-auto py-8 md:w-1/3 w-full mx-6 shadow-xl flex flex-col justify-center items-center">
          <span className="text-3xl font-bold">Register</span>
          <form className=" flex flex-col mt-2 w-full px-20">
            <label className="mt-6 mb-2 font-semibold text-lg">First Name</label>
            <input
              className="p-3 bg-gray-100 border-none rounded-sm focus:outline-none"
              type="text"
              placeholder="enter your first name..."
              onChange={(e) => setfirstName(e.target.value)}
              value={firstName}
            />

            <label className="mt-6 mb-2 font-semibold text-lg">last Name</label>
            <input
              className="p-3 bg-gray-100 border-none rounded-sm focus:outline-none"
              type="text"
              placeholder="enter your last name..."
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
            />

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

            {error && <div className="text-red-500 bg-red-100 mt-1 px-2 text-sm">{error}</div>}

            <button
              onClick={submitHandler}
              className="mt-6 text-lg font-semibold cursor-pointer bg-primary bg-red-500 p-3 border-none rounded-xl"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
