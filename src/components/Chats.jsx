import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BsFillChatFill } from "react-icons/bs";
import { db, auth } from "../utils/firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/appSlice";
import { ImRadioUnchecked } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { resetCamerImage } from "../features/cameraSlice";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const takeSnap = () => {
    dispatch(resetCamerImage());
    navigate("/");
  };

  return (
    <div className="chats relative w-[350px] h-[550px] flex flex-col">
      <div className="chats_header bg-blue-500 pt-4 shadow-lg shadow-slate-800 pb-2 text-black flex justify-center items-center gap-3">
        <img
          onClick={() => {
            auth.signOut();
          }}
          src={user?.profilePic}
          className="w-12 rounded-full"
          alt="Avatar"
          referrerPolicy="no-referrer"
        />
        <div className="flex items-center gap-1">
          <FiSearch size={25} />
          <input
            type="text"
            placeholder="Search Friends"
            className="p-1 rounded-xl outline-none"
          />
        </div>
        <BsFillChatFill size={25} />
      </div>

      <div className="bg-white h-full -mt-1 rounded-tl-md rounded-tr-md overflow-scroll space-y-2 pt-1">
        {posts?.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read, photoId },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              profilePic={profilePic}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              photoId={photoId}
            />
          )
        )}
      </div>

      <ImRadioUnchecked
        onClick={takeSnap}
        className="absolute cursor-pointer hover:opacity-80 bottom-0 left-[52%] translate-x-[-50%] translate-y-[-50%] text-gray-600"
        size={55}
      />
    </div>
  );
};

export default Chats;
