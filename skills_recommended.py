# import openai
# from dotenv import load_dotenv
# import os

# # Load the API key from .env
# load_dotenv()
# openai.api_key = os.getenv("OPENAI_API_KEY")

# # Function to get recommended skills
# def recommend_skills(username, company, position, job_description):
#     # Prompt for the built-in LLM
#     prompt = f"""
#     You are a career guidance assistant. Your task is to analyze the job description provided by the user and recommend the most relevant skills they need to learn or improve upon. Please review the job description and identify core skills based on the user’s position and industry.

#     Here is the information provided by the user:

#     Name: {username}
#     Company: {company}
#     Position: {position}
#     Job Description: {job_description}

#     Based on this information, please respond with a list of skills they should focus on. Provide around 5-7 skills, making sure they are highly relevant to their job description. Make the list concise and specific to their role.

#     Example Output:

#     Skill 1
#     Skill 2
#     Skill 3
#     If you detect key areas like data analysis, programming, project management, or design, include skills related to those domains. Do not list general soft skills unless they are specifically important for this role.
#     """

#     # Call the OpenAI API
#     try:
#         response = openai.ChatCompletion.create(
#             model="gpt-4o-mini",  # Use the gpt-4o-mini model
#             messages=[
#                 {"role": "system", "content": "You are a helpful career guidance assistant."},
#                 {"role": "user", "content": prompt}
#             ],
#             max_tokens=300,
#             temperature=0.7,
#         )

#         # Extract the response text
#         output = response['choices'][0]['message']['content'].strip()
#         return output

#     except Exception as e:
#         return f"An error occurred: {e}"

# # Main function to get inputs from the user
# def main():
#     print("Career Guidance Assistant")
#     username = input("Enter your name: ")
#     company = input("Enter the company name: ")
#     position = input("Enter the job position: ")
#     job_description = input("Enter the job description: ")

#     print("\nAnalyzing job description and recommending skills...\n")
#     skills = recommend_skills(username, company, position, job_description)
#     print("Recommended Skills:\n")
#     print(skills)

# if __name__ == "__main__":
#     main()
import openai
from dotenv import load_dotenv
import os
import pandas as pd  # Import pandas for handling Excel/CSV

# Load the API key from .env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to get recommended skills
def recommend_skills(username, company, position, job_description):
    # Prompt for the built-in LLM
    prompt = f"""
    You are a career guidance assistant. Your task is to analyze the job description provided by the user and recommend the most relevant skills they need to learn or improve upon. Please review the job description and identify core skills based on the user’s position and industry.

    Here is the information provided by the user:

    Name: {username}
    Company: {company}
    Position: {position}
    Job Description: {job_description}

    Based on this information, please respond with a list of skills they should focus on. Provide around 5-7 skills, making sure they are highly relevant to their job description. Highlight the skills by enclosing them within ** (e.g., **Skill**).
    """

    # Call the OpenAI API
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # Use the gpt-4o-mini model
            messages=[
                {"role": "system", "content": "You are a helpful career guidance assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7,
        )

        # Extract the response text
        output = response['choices'][0]['message']['content'].strip()
        return output

    except Exception as e:
        return f"An error occurred: {e}"

# Function to extract skills enclosed in **
def extract_skills(skills_text):
    import re
    # Use regex to find all text enclosed in **
    skills = re.findall(r"\*\*(.*?)\*\*", skills_text)
    return skills

# Function to save skills to a CSV file
def save_skills_to_csv(username, skills, file_name="recommended_skills.csv"):
    # Prepare data for the DataFrame
    data = {"Name": [username], **{f"Skill {i+1}": [skills[i]] if i < len(skills) else [None] for i in range(7)}}

    # Convert to DataFrame
    df = pd.DataFrame(data)

    # Save to CSV
    if not os.path.isfile(file_name):  # If file doesn't exist, create a new one
        df.to_csv(file_name, index=False)
    else:  # Append to the existing file
        df.to_csv(file_name, mode='a', header=False, index=False)

    print(f"\nSkills saved to {file_name} successfully!")

# Main function to get inputs from the user
def main():
    print("Career Guidance Assistant")
    username = input("Enter your name: ")
    company = input("Enter the company name: ")
    position = input("Enter the job position: ")
    job_description = input("Enter the job description: ")

    print("\nAnalyzing job description and recommending skills...\n")
    skills_text = recommend_skills(username, company, position, job_description)
    print("Recommended Skills:\n")
    print(skills_text)

    # Extract skills and save to CSV
    skills = extract_skills(skills_text)
    save_skills_to_csv(username, skills)

if __name__ == "__main__":
    main()
