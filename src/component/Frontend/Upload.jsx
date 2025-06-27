import Editor from "./Editor";
import React from "react";
import "./Upload.css";
export default function Upload() {
  return (
    <div className="upload-container">
      <h3>Upload MyResume </h3>
      <div className="file-upload">Upload a .pdf or .docx file</div>
      <div className="pdf">
        <input type="file" accept=".pdf,.docx" />
        
      </div>

      <p>(Parsing simulated with dummy content)</p>
    </div>
  );
}
