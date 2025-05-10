from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import skill_recommendation_api  # Importing your skills_recommended module
from fastapi.middleware.cors import CORSMiddleware


# Initialize the FastAPI app
app = FastAPI()

# Define a request model using Pydantic for input validation
class SkillsRequest(BaseModel):
    company: str
    job_description: str
    position: str
    username: str

# Define a route for recommending skills and courses
@app.post("/handle/recommend-skills")
def recommend_skills_and_courses_endpoint(request: SkillsRequest):
    try:
        # Call the function from skills_recommended.py
        output = skills_recommended.recommend_skills_and_courses(
            username=request.username,
            company=request.company,
            position=request.position,
            job_description=request.job_description
        )

        # Get MongoDB insertion result
        mongo_result = output.get("mongo_store_status", {})
        inserted_id = mongo_result.get("inserted_id", None)

        return {
            "status": True,
            "recommendations": output["recommendations"],
            "data": {
                "_id": inserted_id
            }
        }
    except Exception as e:
        # Log the detailed error for debugging
        print(f"Error occurred: {e}")  # Log the error
        raise HTTPException(status_code=500, detail=str(e))


# A health check endpoint (optional)
@app.get("/")
def health_check():
    return {"message": "FastAPI server is running!"}

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Or specify your frontend URL: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
