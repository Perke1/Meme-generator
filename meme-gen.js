import React, { useEffect, useState, useRef } from "react";

import exportAsImage from "./exportImage";

const Inputs = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  return (
    <>
      <UploadAndDisplayImage top={topText} bot={bottomText} />
      <div className="labels">
        <p>Top Text</p>
        <input
          type="text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        ></input>
        <p>Bottom Text</p>
        <input
          type="text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        ></input>
      </div>
    </>
  );
};

const UploadAndDisplayImage = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showRemove, setShowRemove] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const exportRef = useRef();

  useEffect(() => {
    if (selectedImage) {
      setShowRemove(true);
      setShowDownload(true);
    }
  }, [selectedImage, props]);

  const removeHandler = () => {
    setSelectedImage(null);
    setShowRemove(false);
    setShowDownload(false);
  };

  return (
    <>
      {selectedImage && (
        <div className="box" ref={exportRef}>
          <h2 className="toptext">{props.top}</h2>

          <img
            className="image"
            alt="Selected"
            width={"100%"}
            src={URL.createObjectURL(selectedImage)}
          />

          <h2 className="bottext">{props.bot}</h2>
        </div>
      )}
      <form>
        <input
          type="file"
          name="myImage"
          className="upload"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
        <p>Drag your files here or click.</p>
      </form>
      <div className="buttons">
        {showDownload && (
          <button onClick={() => exportAsImage(exportRef.current)}>
            Export{" "}
          </button>
        )}
        {showRemove && <button onClick={removeHandler}>Remove</button>}
      </div>
    </>
  );
};

const MemeGen = () => {
  return (
    <>
      <p id="title">Meme generator using react</p>
      <Inputs />
    </>
  );
};

export default MemeGen;
