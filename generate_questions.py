# import openai
# from dotenv import load_dotenv
# import os

# # Load the API key from .env
# load_dotenv()
# openai.api_key = os.getenv("OPENAI_API_KEY")

# # Function to generate interview questions
# def generate_questions(skill):
#     prompt = f"""
#     You are an expert interviewer creating questions for a candidate to assess their proficiency in {skill}. 
#     Please generate three interview questions that cover different aspects of this skill:

#     Question 1 should assess foundational knowledge of {skill}.
#     Question 2 should test practical application and problem-solving skills in {skill}.
#     Question 3 should evaluate advanced understanding or critical thinking related to {skill}.

#     Keep each question concise and focused, as if preparing for a technical interview. Format your response as a list with each question numbered.
#     """
    
#     # Call the OpenAI API
#     try:
#         response = openai.ChatCompletion.create(
#             model="gpt-4o-mini",  # Replace with the appropriate model
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant for creating interview questions."},
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
#     print("Interview Question Generator")
#     selected_skill = input("Enter the skill for which you want to generate questions: ")
    
#     print("\nGenerating questions...\n")
#     questions = generate_questions(selected_skill)
#     print("Generated Interview Questions:\n")
#     print(questions)

# if __name__ == "__main__":
#     main()
# import openai
# from dotenv import load_dotenv
# import os
# import pandas as pd  # Import pandas for CSV handling

# # Load the API key from .env
# load_dotenv()
# openai.api_key = os.getenv("OPENAI_API_KEY")

# # Function to generate interview questions
# def generate_questions(skill):
#     prompt = f"""
#     You are an expert interviewer creating questions for a candidate to assess their proficiency in {skill}. 
#     Please generate three interview questions that cover different aspects of this skill:

#     Question 1 should assess foundational knowledge of {skill}.
#     Question 2 should test practical application and problem-solving skills in {skill}.
#     Question 3 should evaluate advanced understanding or critical thinking related to {skill}.

#     Keep each question concise and focused, as if preparing for a technical interview. Format your response as a list with each question numbered.
#     """
    
#     # Call the OpenAI API
#     try:
#         response = openai.ChatCompletion.create(
#             model="gpt-4o-mini",  # Replace with the appropriate model
#             messages=[{"role": "system", "content": "You are a helpful assistant for creating interview questions."},
#                       {"role": "user", "content": prompt}],
#             max_tokens=300,
#             temperature=0.7,
#         )
#         # Extract the response text
#         output = response['choices'][0]['message']['content'].strip()
#         return output

#     except Exception as e:
#         return f"An error occurred: {e}"

# # Function to extract skill name and questions
# def extract_questions(skill, questions_text):
#     # Split the questions based on numbering
#     questions = questions_text.split("\n")
#     clean_questions = {}
#     for question in questions:
#         if question.startswith("1."):
#             clean_questions['Question 1'] = question[3:].strip()
#         elif question.startswith("2."):
#             clean_questions['Question 2'] = question[3:].strip()
#         elif question.startswith("3."):
#             clean_questions['Question 3'] = question[3:].strip()

#     # Return the cleaned questions
#     return {
#         "Skill": skill,
#         **clean_questions
#     }

# # Function to save questions to a CSV file
# def save_questions_to_csv(skill_data, file_name="interview_questions.csv"):
#     # Convert the skill data to a DataFrame
#     df = pd.DataFrame([skill_data])

#     # Save to CSV
#     if not os.path.isfile(file_name):  # Create a new file if it doesn't exist
#         df.to_csv(file_name, index=False)
#     else:  # Append to the existing file
#         df.to_csv(file_name, mode='a', header=False, index=False)

#     print(f"\nQuestions saved to {file_name} successfully!")

# # Main function to get inputs from the user
# def main():
#     print("Interview Question Generator")
#     selected_skill = input("Enter the skill for which you want to generate questions: ")
    
#     print("\nGenerating questions...\n")
#     questions_text = generate_questions(selected_skill)
#     print("Generated Interview Questions:\n")
#     print(questions_text)

#     # Extract skill and questions and save to CSV
#     skill_data = extract_questions(selected_skill, questions_text)
#     save_questions_to_csv(skill_data)

# if __name__ == "__main__":
#     main()



import openai
from dotenv import load_dotenv
import os
import pandas as pd  # Import pandas for CSV handling
import re  # For text cleaning

# Load the API key from .env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to generate interview questions
def generate_questions(skill):
    prompt = f"""
    You are an expert interviewer creating questions for a candidate to assess their proficiency in {skill}. 
    Please generate three interview questions that cover different aspects of this skill:

    Question 1 should assess foundational knowledge of {skill}.
    Question 2 should test practical application and problem-solving skills in {skill}.
    Question 3 should evaluate advanced understanding or critical thinking related to {skill}.

    Keep each question concise and focused, as if preparing for a technical interview. Format your response as a list with each question numbered.
    """
    
    # Call the OpenAI API
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # Replace with the appropriate model
            messages=[{"role": "system", "content": "You are a helpful assistant for creating interview questions."},
                      {"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7,
        )
        # Extract the response text
        output = response['choices'][0]['message']['content'].strip()
        return output

    except Exception as e:
        return f"An error occurred: {e}"

# Function to clean question text (remove text between ** **)
def clean_text(text):
    return re.sub(r"\*\*.*?\*\*", "", text).strip()

# Function to extract skill name and questions
def extract_questions(skill, questions_text):
    # Split the questions based on numbering
    questions = questions_text.split("\n")
    clean_questions = {}
    for question in questions:
        if question.startswith("1."):
            clean_questions['Question 1'] = clean_text(question[3:].strip())
        elif question.startswith("2."):
            clean_questions['Question 2'] = clean_text(question[3:].strip())
        elif question.startswith("3."):
            clean_questions['Question 3'] = clean_text(question[3:].strip())

    # Return the cleaned questions
    return {
        "Skill": skill,
        **clean_questions
    }

# Function to save questions to a CSV file
def save_questions_to_csv(skill_data, file_name="interview_questions.csv"):
    # Convert the skill data to a DataFrame
    df = pd.DataFrame([skill_data])

    # Save to CSV
    if not os.path.isfile(file_name):  # Create a new file if it doesn't exist
        df.to_csv(file_name, index=False)
    else:  # Append to the existing file
        df.to_csv(file_name, mode='a', header=False, index=False)

    print(f"\nQuestions saved to {file_name} successfully!")

# Main function to get inputs from the user
def main():
    print("Interview Question Generator")
    selected_skill = input("Enter the skill for which you want to generate questions: ")
    
    print("\nGenerating questions...\n")
    questions_text = generate_questions(selected_skill)
    print("Generated Interview Questions:\n")
    print(questions_text)

    # Extract skill and questions and save to CSV
    skill_data = extract_questions(selected_skill, questions_text)
    save_questions_to_csv(skill_data)

if __name__ == "__main__":
    main()

