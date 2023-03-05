import React, { useEffect } from "react";
import WebcamCapture from "./components/WebcamCapture";
import { Routes, Route, useNavigate } from "react-router-dom";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import ChatView from "./components/ChatView";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login, logout } from "./features/appSlice";
import { auth } from "./utils/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Useffect of App");
    auth.onAuthStateChanged((authUser) => {
      console.log("authuser", authUser);
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            id: authUser.uid,
            profilePic: authUser.photoURL,
          })
        );
        navigate("/chats");
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="App bg-yellow-300 h-screen text-white flex flex-col items-center justify-center">
      {!user ? (
        <Login />
      ) : (
        <Routes>
          <Route exact path="/" element={<WebcamCapture />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/view" element={<ChatView />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
