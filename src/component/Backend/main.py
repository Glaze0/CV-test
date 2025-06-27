
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uuid
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIEnhanceRequest(BaseModel):
    section: str
    content: str

class ResumeData(BaseModel):
    resume: dict

@app.post("/ai-enhance")
def ai_enhance(req: AIEnhanceRequest):
    improved = f"Enhanced Version of ({req.section}): {req.content} - with AI polish!"
    return {"enhanced_content": improved}

@app.post("/save-resume")
def save_resume(data: ResumeData):
    os.makedirs("saved_resumes", exist_ok=True)
    filename = f"saved_resumes/resume_{uuid.uuid4().hex}.json"
    with open(filename, "w") as f:
        json.dump(data.resume, f, indent=2)
    return {"status": "success", "filename": filename}
