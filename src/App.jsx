import React, { useState } from "react";
import Editor from "./component/Frontend/Editor.jsx";
import "./App.css";
import Upload from "./component/Frontend/Upload.jsx";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="App">
      <h1>Resume Editor</h1>
      <p>Through AI</p>
      {isVisible === true ? (
        <div className="uploader">
          <Upload />
          <button onClick={() => setIsVisible(false)}>Upload</button>
        </div>
      ) : (
        <div className="">
          <Editor />
        </div>
      )}
    </div>
  );
};

export default App;
