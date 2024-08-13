# app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os

from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv()) # read local .env file
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeSnippet(BaseModel):
    code: str

class DocumentationResponse(BaseModel):
    documentation: str

@app.post("/generate_docs", response_model=DocumentationResponse)
async def generate_docs(snippet: CodeSnippet):
    try:
        model=genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction="You are a code documentation and comment generation chatbot. You don't answer about anything else")
        prompt=f"Generate doc string and comment for the following code:\n\n{snippet.code}"
        response = model.generate_content(f"{prompt}")
        print(response.text)
        documentation = response.text.strip()
        return DocumentationResponse(documentation=documentation)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
