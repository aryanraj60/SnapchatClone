import React from "react";
import { auth, provider } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/appSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            id: result.user.uid,
            profilePic: result.user.photoURL,
          })
        );
        navigate("/chats");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div className="flex flex-col space-y-4">
      <img
        src="https://www.freepnglogos.com/uploads/snapchat-logo-png-0.png"
        alt="logo"
        className="w-48"
      />
      <button
        onClick={handleLogin}
        className="px-3 py-2 text-xl w-full bg-black text-white hover:bg-white hover:text-black"
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
