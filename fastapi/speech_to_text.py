import speech_recognition as sr

def record_statement():
    # Initialize recognizer
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()
    
    print("Adjusting microphone for ambient noise, please wait...")
    with microphone as source:
        recognizer.adjust_for_ambient_noise(source, duration=2)
        print("Microphone adjusted. You may start speaking. Press 'Ctrl+C' when done.")
    
    audio_list = []
    
    try:
        while True:
            print("\nListening... (Press 'Ctrl+C' to stop recording)")
            with microphone as source:
                audio = recognizer.listen(source)
                audio_list.append(audio)  # Collect audio segments
    except KeyboardInterrupt:
        print("\nRecording stopped.")
    
    # Combine audio segments for transcription
    return audio_list, recognizer

def transcribe_audio(audio_list, recognizer):
    full_text = ""
    for audio in audio_list:
        try:
            # Recognize speech using Google Web Speech API
            print("Processing speech...")
            text = recognizer.recognize_google(audio)
            full_text += text + " "
        except sr.UnknownValueError:
            print("Could not understand part of your speech.")
        except sr.RequestError as e:
            print(f"API Error: {e}")
            break
    return full_text.strip()

def save_to_notebook(text, file_path="speech_notes.txt"):
    try:
        with open(file_path, "a") as file:
            file.write(text + "\n")
        print(f"Your speech has been saved to {file_path}.")
    except Exception as e:
        print(f"Error saving to file: {e}")

if __name__ == "__main__":
    print("Speech-to-Text Recorder")
    print("Record your statement and save it to a notebook after you're done.")
    
    while True:
        action = input("\nPress 'R' to start recording, 'Q' to quit: ").strip().upper()
        if action == 'Q':
            print("Exiting program. Goodbye!")
            break
        elif action == 'R':
            print("Recording started. Press 'Ctrl+C' when done speaking.")
            audio_list, recognizer = record_statement()
            print("Processing your entire statement...")
            transcribed_text = transcribe_audio(audio_list, recognizer)
            if transcribed_text:
                print(f"Transcribed Text: {transcribed_text}")
                save_choice = input("Do you want to save this statement to the notebook? (Y/N): ").strip().upper()
                if save_choice == 'Y':
                    save_to_notebook(transcribed_text)
            else:
                print("No valid speech detected.")
        else:
            print("Invalid option. Please press 'R' to record or 'Q' to quit.")
