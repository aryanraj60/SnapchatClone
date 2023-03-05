import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { ImRadioUnchecked } from "react-icons/im";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../features/cameraSlice";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 300,
  height: 450,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcampRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcampRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/preview");
  }, [webcampRef]);

  return (
    <div className="webcampCapture relative">
      <Webcam
        style={{ transform: "scaleX(-1)" }}
        audio={false}
        height={videoConstraints.height}
        ref={webcampRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <ImRadioUnchecked
        size={35}
        onClick={capture}
        className="absolute bottom-0 left-[50%] translate-y-[-50%] translate-x-[-50%] cursor-pointer text-red-700"
      />
    </div>
  );
};

export default WebcamCapture;
