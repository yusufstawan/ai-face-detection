import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import NewPost from "./components/NewPost";

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };

    file && getImage();
  }, [file]);

  return (
    <div>
      <Navbar />
      {image ? (
        <NewPost image={image} />
      ) : (
        <div className="newPostCard">
          <div className="addPost">
            <img src="https://yusufstawan.com/static/media/me.fde9d953c3be3bc24833.png" alt="" className="avatar" />
            <div className="postForm">
              <input type="text" placeholder="Whats on your mind?" className="postInput" />
              <label htmlFor="file">
                <img className="addImg" src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png" alt="" />
                <img className="addImg" src="https://icon-library.com/images/maps-icon-png/maps-icon-png-5.jpg" alt="" />
                <img className="addImg" src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84451/preview.svg" alt="" />
                <button>Send</button>
              </label>
              <input onChange={(e) => setFile(e.target.files[0])} id="file" style={{ display: "none" }} type="file" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
