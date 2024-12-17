import React, { useEffect, useRef } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, useNavigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  googleLogin,
  login,
  setUser,
  signup,
} from "../features/auth/authSlice";
import { lookInSession } from "../common/session";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef(null);
  const { error, status, user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const formData = new FormData(form);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    const data = Object.fromEntries(formData.entries());
    const { fullname, email, password } = data;

    if (fullname && fullname.length < 3) {
      return toast.error("Full name should be at least 3 letters long");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a number, 1 lowercase, and 1 uppercase letter"
      );
    }

    if (type === "log-in") {
      dispatch(login(data));
    } else {
      dispatch(signup(data));
    }
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();

    try {
      const user = await authWithGoogle();
      const formData = { access_token: user.accessToken };
      dispatch(googleLogin(formData));
    } catch (err) {
      toast.error("Trouble logging in through Google");
      console.error(err);
    }
  };

  useEffect(() => {
    const storedUser = lookInSession("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed") {
      toast.error(error);
    } else if (status === "succeeded") {
      toast.success(
        `${type === "log-in" ? "Logged in" : "Signed up"} successfully!`
      );
      formRef.current?.reset();
      navigate("/");
    }
  }, [status, error, type, navigate]);

  return (
    <AnimationWrapper keyValue={type}>
      <Toaster />
      <section className="h-cover flex items-center justify-center">
        <form
          ref={formRef}
          className="w-[80%] max-w-[400px] text-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-gelasio capitalize mb-24">
            {type === "log-in" ? "Welcome back" : "Join us today"}
          </h1>

          {type !== "log-in" && (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full name"
              icon="fi-rr-user"
            />
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />

          <button className="btn-dark center mt-14" type="submit">
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
            onClick={handleGoogleAuth}
          >
            <img src={googleIcon} alt="google icon" className="w-5" />
            Continue with Google
          </button>

          {type === "log-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <Link to="/login" className="underline text-black text-xl ml-1">
                Sign in Here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
