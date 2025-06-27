import { useState } from "react";
import axios from "axios";
import "./Editor.css";

export default function Editor() {
  const [resume, setResume] = useState({
    name: "Helper A",
    summary: "Experienced developer...",
    experience: ["Software Engineer at XYZ Corp."],
    education: ["B.Tech Computer Science"],
    skills: ["JavaScript", "React", "Node.js"],
  });

  const enhanceSection = async (section) => {
    const res = await axios.post("http://127.0.0.1:8000/ai-enhance", {
      section,
      content: resume[section],
    });
    setResume({ ...resume, [section]: res.data.enhanced_content });
  };

  const saveResume = async () => {
    await axios.post("http://127.0.0.1:8000/save-resume", { resume });
    alert("Resume saved!");
  };

  const downloadResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
  };

  const [addSection, setAddSection] = useState(false);

  return (
    <div className="editor-container">
      <h2>Edit Your Resume</h2>
      <div className="name">
        <label>Name:</label>
        <input
          value={resume.name}
          onChange={(e) => setResume({ ...resume, name: e.target.value })}
        />
      </div>

      <div className="experience">
        <label>Experience: </label>
        <textarea
          value={resume.experience.join("\n")}
          onChange={(e) =>
            setResume({ ...resume, experience: e.target.value.split("\n") })
          }
        />
      </div>

      <div className="education">
        <label>Education: </label>
        <textarea
          value={resume.education.join("\n")}
          onChange={(e) =>
            setResume({ ...resume, education: e.target.value.split("\n") })
          }
        />
      </div>

      <div className="skills">
        <label>Skills: </label>
        <textarea
          value={resume.skills.join(", ")}
          onChange={(e) =>
            setResume({
              ...resume,
              skills: e.target.value.split(",").map((s) => s.trim()),
            })
          }
        />
      </div>
      {addSection === false ? (
        <button onClick={() => setAddSection(true)}>Add a Summary</button>
      ) : (
        <div className="summary">
          <label>Summary:</label>
          <textarea
            value={resume.summary}
            onChange={(e) => setResume({ ...resume, summary: e.target.value })}
          />
        </div>
      )}

      <br />
      <br />
      <div className="buttons">
        <button onClick={saveResume}>Save Resume</button>
        <button onClick={downloadResume}>Download JSON</button>
        <button onClick={() => enhanceSection("summary")}>
          Enhance with AI
        </button>
      </div>
    </div>
  );
}
