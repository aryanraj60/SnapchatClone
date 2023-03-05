import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelectedImage } from "../features/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { storage } from "../utils/firebase";

const ChatView = () => {
  const selectedImage = useSelector(getSelectedImage);
  const navigate = useNavigate();

  const exit = () => {
    navigate("/chats");
    const selectedImageRef = storage.ref(`posts/${selectedImage.photoId}`);
    selectedImageRef.delete();
  };

  useEffect(() => {
    if (!selectedImage.imageUrl) {
      exit();
    }
  }, [selectedImage.imageUrl]);

  return (
    <div className="relative">
      <img
        src={selectedImage.imageUrl}
        alt=""
        onClick={exit}
        style={{ transform: "scaleX(-1)" }}
      />
      <div className="absolute top-0 right-0">
        <CountdownCircleTimer
          isPlaying={true}
          duration={10}
          strokeWidth={6}
          size={50}
          colors={["#B3B6B7", "#E74C3C"]}
          colorsTime={[10, 0]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
              const selectedImageRef = storage.ref(
                `posts/${selectedImage.photoId}`
              );
              selectedImageRef.delete();
            }

            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ChatView;
