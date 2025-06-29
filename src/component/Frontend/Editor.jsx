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

  const [showSummary, setShowSummary] = useState(true);

  // Helper functions for managing array fields
  const addArrayItem = (section) => {
    setResume({
      ...resume,
      [section]: [...resume[section], ""],
    });
  };

  const removeArrayItem = (section, index) => {
    const newArray = resume[section].filter((_, i) => i !== index);
    setResume({
      ...resume,
      [section]: newArray,
    });
  };

  const updateArrayItem = (section, index, value) => {
    const newArray = [...resume[section]];
    newArray[index] = value;
    setResume({
      ...resume,
      [section]: newArray,
    });
  };

  const updateSkillItem = (index, value) => {
    const newSkills = [...resume.skills];
    newSkills[index] = value;
    setResume({
      ...resume,
      skills: newSkills,
    });
  };

  const addSkill = () => {
    setResume({
      ...resume,
      skills: [...resume.skills, ""],
    });
  };

  const removeSkill = (index) => {
    const newSkills = resume.skills.filter((_, i) => i !== index);
    setResume({
      ...resume,
      skills: newSkills,
    });
  };

  return (
    <div className="editor-container">
      <h2>Edit Your Resume</h2>

      {/* Name Section */}
      <div className="name">
        <label>Name:</label>
        <input
          type="text"
          value={resume.name}
          onChange={(e) => setResume({ ...resume, name: e.target.value })}
        />
      </div>

      {/* Summary Section */}
      {showSummary ? (
        <div className="summary">
          <div className="section-header">
            <label>Summary:</label>
            <div className="button-group">
              <button onClick={() => enhanceSection("summary")}>
                Enhance with AI
              </button>
              <button
                className="remove-btn"
                onClick={() => setShowSummary(false)}
              >
                Remove Summary
              </button>
            </div>
          </div>
          <textarea
            value={resume.summary}
            onChange={(e) => setResume({ ...resume, summary: e.target.value })}
          />
        </div>
      ) : (
        <div className="add-section">
          <button onClick={() => setShowSummary(true)}>Add Summary</button>
        </div>
      )}

      {/* Experience Section */}
      <div className="experience">
        <div className="section-header">
          <label>Experience:</label>
          <div className="button-group">
            <button onClick={() => enhanceSection("experience")}>
              Enhance with AI
            </button>
            <button onClick={() => addArrayItem("experience")}>
              Add Experience
            </button>
          </div>
        </div>
        {resume.experience.map((exp, index) => (
          <div key={index} className="item-row">
            <textarea
              value={exp}
              onChange={(e) =>
                updateArrayItem("experience", index, e.target.value)
              }
              placeholder="Enter experience details..."
            />
            <button
              className="remove-btn"
              onClick={() => removeArrayItem("experience", index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="education">
        <div className="section-header">
          <label>Education:</label>
          <div className="button-group">
            <button onClick={() => enhanceSection("education")}>
              Enhance with AI
            </button>
            <button onClick={() => addArrayItem("education")}>
              Add Education
            </button>
          </div>
        </div>
        {resume.education.map((edu, index) => (
          <div key={index} className="item-row">
            <input
              type="text"
              value={edu}
              onChange={(e) =>
                updateArrayItem("education", index, e.target.value)
              }
              placeholder="Enter education details..."
            />
            <button
              className="remove-btn"
              onClick={() => removeArrayItem("education", index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div className="skills">
        <div className="section-header">
          <label>Skills:</label>
          <div className="button-group">
            <button onClick={() => enhanceSection("skills")}>
              Enhance with AI
            </button>
            <button onClick={addSkill}>Add Skill</button>
          </div>
        </div>
        <div className="skills-grid">
          {resume.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <input
                type="text"
                value={skill}
                onChange={(e) => updateSkillItem(index, e.target.value)}
                placeholder="Enter skill..."
              />
              <button
                className="remove-btn-small"
                onClick={() => removeSkill(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <br />
      <br />

      {/* Action Buttons */}
      <div className="buttons">
        <button onClick={saveResume}>Save Resume</button>
        <button onClick={downloadResume}>Download JSON</button>
      </div>
    </div>
  );
}
