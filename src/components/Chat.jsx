import React from "react";
import { FaStop } from "react-icons/fa";
import { useDispatch } from "react-redux";
import TimeAgo from "timeago-react";
import { selectImage } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";

const Chat = ({
  profilePic,
  id,
  username,
  timestamp,
  imageUrl,
  read,
  photoId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = () => {
    if (!read) {
      dispatch(
        selectImage({
          imageUrl,
          photoId,
        })
      );
      db.collection("posts").doc(id).update({
        read: true,
      });
      navigate("/chats/view");
    }
  };

  return (
    <div
      onClick={open}
      className="flex justify-between items-center hover:opacity-80 cursor-pointer text-gray-700 px-2 py-1 gap-1 border-b "
    >
      <img
        referrerPolicy="no-referrer"
        src={profilePic}
        className="w-12 rounded-full"
        alt="Avatar"
      />
      <div className="flex-1">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"} {""}
          <TimeAgo datetime={timestamp?.toDate()} />
        </p>
      </div>

      {!read && <FaStop className="text-red-600" size={25} />}
    </div>
  );
};

export default Chat;
