import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const NewPost = ({ image }) => {
  const { url, width, height } = image;
  const [faces, setFaces] = useState([]);
  const [friends, setFriends] = useState([]);

  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImages = async () => {
    const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions());
    setFaces(detections.map((d) => Object.values(d.box)));
  };

  const handleMouse = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "yellow";
    faces.map((face) => ctx.strokeRect(...face));
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models"), faceapi.nets.faceLandmark68Net.loadFromUri("/models"), faceapi.nets.faceExpressionNet.loadFromUri("/models")])
        .then(handleImages)
        .catch((e) => console.log(e));
    };

    imgRef.current && loadModels();
  }, []);

  const addFriend = (e) => {
    setFriends((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container">
      <div className="left" style={{ width, height }}>
        <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" />
        <canvas onMouseEnter={handleMouse} ref={canvasRef} width={width} height={height} />
        {faces.map((face, index) => (
          <input name={`input${index}`} style={{ left: face[0], top: face[1] + face[3] + 5 }} placeholder="Tag your friend" key={index} className="friendInput" onChange={addFriend} />
        ))}
      </div>
      <div className="right">
        <input type="text" placeholder="Whats on your mind?" className="rightInput" />
      </div>
      {friends && (
        <span className="friends">
          with <span className="name">{Object.values(friends) + " "}</span>{" "}
        </span>
      )}
      <button className="rightButton">Send</button>
    </div>
  );
};

export default NewPost;
