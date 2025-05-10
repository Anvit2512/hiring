import datetime

import openai

from dotenv import load_dotenv

import os

from fastapi import FastAPI, HTTPException

from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware

from motor.motor_asyncio import AsyncIOMotorClient

from fastapi import Path

from bson import ObjectId


# Load environment variables

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")



# FastAPI app instance

app = FastAPI(title="Career Guidance Assistant API")

# MongoDB client setup
MONGO_DETAILS = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_DETAILS)
db = client.career_guidance
recommendations_collection = db.get_collection("recommendations")

# parsing function
def parse_recommendations(text):
    result = {
        "skills": [],
        "courses": []
    }
    
    parts = text.split('\n\nCourses:\n')
    if len(parts) < 2:
        return result
    
    # Parse skills
    skills_section = parts[0].replace('Skills:\n', '').strip()
    result["skills"] = [s.strip().replace('- ', '') for s in skills_section.split('\n') if s.strip()]
    
    # Parse courses
    courses_section = parts[1].strip()
    course_blocks = courses_section.split('\n\nCourse ')
    
    for block in course_blocks:
        if not block.strip():
            continue
        
        lines = block.split('\n')
        first_line = lines[0]
        colon_index = first_line.find(':')
        dash_index = first_line.find(' - ')
        
        course = {
            "courseName": first_line[colon_index+1:dash_index].strip(),
            "platform": first_line[dash_index+3:].strip(),
            "skills": []
        }
        
        for line in lines[1:]:
            skill = line.strip().replace('- ', '')
            if skill:
                course["skills"].append({"skillName": skill})
        
        result["courses"].append(course)
    
    return result



# Request body model

class RecommendationRequest(BaseModel):

    username: str

    company: str

    position: str

    job_description: str



@app.get("/")

async def root():

    return {"message": "Welcome to the Career Guidance Assistant API. Go to /docs for usage."}





# API route

# @app.get("/handle/recommendations/{id}")
# async def get_recommendation_by_id(id: str = Path(...)):
#     try:
#         recommendation = await recommendations_collection.find_one({"_id": ObjectId(id)})
#         if recommendation:
#             recommendation["_id"] = str(recommendation["_id"])
#             return recommendation
#         raise HTTPException(status_code=404, detail="Recommendation not found.")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.get("/handle/recommendations/{id}")
async def get_recommendation_by_id(id: str = Path(...)):
    try:
        if not ObjectId.is_valid(id):
            raise HTTPException(status_code=400, detail="Invalid ID format")
            
        recommendation = await recommendations_collection.find_one({"_id": ObjectId(id)})
        if not recommendation:
            raise HTTPException(status_code=404, detail="Recommendation not found")
            
        # Ensure recommendations field exists and is a string
        if "recommendations" not in recommendation or not isinstance(recommendation["recommendations"], str):
            raise HTTPException(status_code=422, detail="Invalid recommendations format")
            
        # Parse the recommendations
        parsed = parse_recommendations(recommendation["recommendations"])
        
        return {
            "status": True,
            "data": {
                "_id": str(recommendation["_id"]),
                "recommendations": recommendation["recommendations"],
                "parsed": parsed
            }
        }
        
    except Exception as e:
        print(f"Error in get_recommendation_by_id: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
    
@app.get("/handle/user-recommendations/{email}")
async def get_user_recommendations(email: str):
    try:
        # Get all recommendations for this user
        recommendations = []
        async for doc in db.user_recommendations.find({"user_email": email}):
            rec = await recommendations_collection.find_one(
                {"_id": ObjectId(doc["recommendation_id"])}
            )
            if rec:
                rec["_id"] = str(rec["_id"])
                recommendations.append(rec)
        
        return {
            "status": True,
            "data": recommendations
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/handle/recommend-skills")

async def recommend_skills_and_courses(request: RecommendationRequest):

    prompt = f"""

    You are a career guidance assistant. Your task is to analyze the job description provided by the user and recommend the most relevant skills and courses they need to learn or improve upon. Please review the job description and identify core skills based on the user’s position and industry. Additionally, recommend three online courses or certifications and specify the key skills they will gain from each course.



    Here is the information provided by the user:



    Name: {request.username}

    Company: {request.company}

    Position: {request.position}

    Job Description: {request.job_description}



    Based on this information, please respond with:



    A list of 10-12 skills they should focus on. Ensure they are highly relevant to their role.

    A list of 4 online courses or certifications along with the key skills they will learn from each course.



    Respond STRICTLY in this format:



    Skills:

    - Skill 1

    - Skill 2

    ...



    Courses:

    Course 1: [Name] - [Platform]

    - Skill A

    - Skill B

    Course 2: [Name] - [Platform]

    - Skill C

    - Skill D

    ...

    """



    try:

        response = openai.ChatCompletion.create(

            model="gpt-4o-mini",

            messages=[

                {"role": "system", "content": "You are a helpful career guidance assistant."},

                {"role": "user", "content": prompt}

            ],

            max_tokens=1000,

            temperature=0.7,

        )



        output = response['choices'][0]['message']['content'].strip()

         # Create the MongoDB document
        recommendation_doc = {
            "username": request.username,
            "company": request.company,
            "position": request.position,
            "job_description": request.job_description,
            "recommendations": output,
        }

        result = await recommendations_collection.insert_one(recommendation_doc)
        inserted_id = str(result.inserted_id)

        # Also save to relational collection
        await db.user_recommendations.insert_one({
            "user_email": request.username,
            "recommendation_id": inserted_id,
            "created_at": datetime.datetime.utcnow()
        })



        return {

            "recommendations": output,
            "status": True,
            "data": {
                "_id": inserted_id
            }

        }



    except Exception as e:

        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:2005"],  # Or specify your frontend URL: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)