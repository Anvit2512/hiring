import openai
import pandas as pd
import os
from dotenv import load_dotenv

# Load the API key from .env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to evaluate candidate responses
def evaluate_response(skill, question, user_response):
    # Define the prompt
    prompt = f"""
    You are an expert interviewer evaluating a candidate's response to an interview question for the skill: {skill}.
    
    The question asked was: {question}
    The candidate’s response: {user_response}
    
    Please evaluate the response based on the following criteria:
    
    Clarity: Is the response clear and well-structured?
    Accuracy: Does the response contain accurate information?
    Completeness: Does the response fully address the question, or are there any missing points?
    Relevance: Is the response focused on the question without unnecessary details?
    
    Provide feedback in a friendly, constructive tone. Be specific about areas where the candidate did well and where they can improve. 
    At the end, rate the response on a scale of 1 to 5, with 5 being an excellent answer.
    """
    try:
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant evaluating interview responses."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=300,
            temperature=0.7,
        )
        # Extract the feedback
        feedback = response['choices'][0]['message']['content'].strip()
        return feedback

    except Exception as e:
        return f"An error occurred during evaluation: {e}"

# Main function to handle the interaction
def main():
    # Read the CSV file
    try:
        questions_df = pd.read_csv("interview_questions.csv")
    except FileNotFoundError:
        print("The file 'interview_questions.csv' was not found. Please ensure the file exists in the same directory.")
        return

    # Ensure necessary columns exist
    if "Skill" not in questions_df.columns or not any(col.startswith("Question") for col in questions_df.columns):
        print("The CSV file is missing required columns ('Skill' or 'Question'). Please check the file format.")
        return

    # Iterate through the questions
    for index, row in questions_df.iterrows():
        skill = row['Skill']
        print(f"\nSkill: {skill}")
        for col in questions_df.columns:
            if col.startswith("Question"):
                question = row[col]
                print(f"\n{col}: {question}")
                user_response = input("Enter your response: ")
                print("\nEvaluating your response...\n")
                feedback = evaluate_response(skill, question, user_response)
                print(f"\nFeedback:\n{feedback}")

if __name__ == "__main__":
    main()
