from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import skills_recommended  # Importing your skills_recommended module
from fastapi.middleware.cors import CORSMiddleware


# Initialize the FastAPI app
app = FastAPI()

# Define a request model using Pydantic for input validation
class SkillsRequest(BaseModel):
    username: str
    company: str
    position: str
    job_description: str

# Define a route for recommending skills and courses
@app.post("/recommend-skills/")
def recommend_skills_and_courses_endpoint(request: SkillsRequest):
    try:
        # Call the function from skills_recommended.py
        output = skills_recommended.recommend_skills_and_courses(
            username=request.username,
            company=request.company,
            position=request.position,
            job_description=request.job_description
        )
        return {"recommendations": output}
    except Exception as e:
        # Return a detailed error if something goes wrong
        raise HTTPException(status_code=500, detail=str(e))

# A health check endpoint (optional)
@app.get("/")
def health_check():
    return {"message": "FastAPI server is running!"}

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173/"],  # Or specify your frontend URL: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
