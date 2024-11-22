import openai
from dotenv import load_dotenv
import os

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
            messages=[
                {"role": "system", "content": "You are a helpful assistant for creating interview questions."},
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

# Main function to get inputs from the user
def main():
    print("Interview Question Generator")
    selected_skill = input("Enter the skill for which you want to generate questions: ")
    
    print("\nGenerating questions...\n")
    questions = generate_questions(selected_skill)
    print("Generated Interview Questions:\n")
    print(questions)

if __name__ == "__main__":
    main()
