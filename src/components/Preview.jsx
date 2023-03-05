import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCamerImage, selectCameraImage } from "../features/cameraSlice";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MdOutlineTextFields } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { FaStickyNote } from "react-icons/fa";
import { BsMusicNote } from "react-icons/bs";
import { IoMdAttach } from "react-icons/io";
import { RiTimerFill } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { v4 as uuid } from "uuid";
import { storage, db } from "../utils/firebase";
import firebase from "firebase/compat/app";
import { selectUser } from "../features/appSlice";

const Preview = () => {
  const user = useSelector(selectUser);
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage]);

  const closePreview = () => {
    dispatch(resetCamerImage());
  };

  const sendPost = () => {
    const id = uuid();
    const postStorageRef = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");
    // uploadString(postStorageRef, cameraImage, "data_url").then((snapshot) => {
    //   console.log("Image uploaded", snapshot);
    // });
    postStorageRef.on(
      "state_changed",
      null,
      (e) => {
        alert(e.message);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              profilePic: user.profilePic,
              photoId: id,
            });
            navigate("/chats");
          });
      }
    );
  };

  return (
    <div className="relative">
      <IoMdClose
        size={30}
        onClick={closePreview}
        className="absolute top-0 left-0 z-10 cursor-pointer text-black"
      />
      <div className="absolute flex flex-col z-10 text-black right-0 top-0 p-1 space-y-3 cursor-pointer">
        <MdOutlineTextFields size={25} />
        <MdCreate size={25} />
        <FaStickyNote size={25} />
        <BsMusicNote size={25} />
        <IoMdAttach size={25} />
        <RiTimerFill size={25} />
      </div>
      <img src={cameraImage} alt="image" style={{ transform: "scaleX(-1)" }} />
      <button
        onClick={sendPost}
        className="absolute bottom-2 right-0 bg-yellow-400 text-black flex items-center p-2 justify-evenly gap-2 font-semibold rounded-xl"
      >
        Send Now <FiSend size={25} />
      </button>
    </div>
  );
};

export default Preview;
