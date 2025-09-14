# Career AI Setup Guide

## Overview
The Career AI feature allows students to input their interests and skills to receive personalized career recommendations powered by Llama 3.2 running locally via Ollama.

## Features
- **Interactive Form**: Students can select their interests and skills from predefined options
- **AI-Powered Recommendations**: Uses Llama 3.2 via Ollama to generate personalized career suggestions
- **Local Processing**: Runs entirely on your local machine for privacy and speed
- **Detailed Career Information**: Each recommendation includes:
  - Career description and match score
  - Required skills
  - Career progression path
  - Salary range
  - Growth prospects
  - Time to achieve
  - Next steps to get started

## Setup Instructions

### 1. Install Ollama
1. Go to [Ollama.ai](https://ollama.ai/)
2. Download and install Ollama for your operating system
3. Follow the installation instructions for your platform

### 2. Install Llama 3.2 Model
After installing Ollama, run the following command in your terminal:

```bash
ollama pull llama3.2
```

This will download the Llama 3.2 model (approximately 2GB). The first time you run this, it may take a few minutes to download.

### 3. Start Ollama Service
Make sure Ollama is running on your machine:

```bash
ollama serve
```

This will start the Ollama service on `http://localhost:11434`

### 4. Verify Installation
You can test if Ollama is working by running:

```bash
ollama run llama3.2 "Hello, how are you?"
```

### 5. API Endpoint
The Career AI feature uses the `/api/career-ai` endpoint which:
- Accepts POST requests with student profile data
- Calls Llama 3.2 via local Ollama API
- Returns structured career recommendations
- Falls back to mock data if Ollama is not running

### 6. Usage
1. Navigate to the student section
2. Click on "Career AI"
3. Fill out the form with interests and skills
4. Submit to get AI-powered career recommendations

## Technical Details

### Frontend (`app/student/career-ai/page.tsx`)
- Multi-step form with interest and skill selection
- Loading state with animated indicators
- Results display with detailed career information
- Responsive design with Tailwind CSS

### Backend (`app/api/career-ai/route.ts`)
- Integrates with local Ollama API running Llama 3.2
- Processes student profile data
- Generates structured career recommendations
- Includes fallback logic for when Ollama is not running

### Data Structure
```typescript
interface CareerSuggestion {
  title: string
  description: string
  matchScore: number
  requiredSkills: string[]
  careerPath: string[]
  salaryRange: string
  growthProspect: string
  timeToAchieve: string
  nextSteps: string[]
}
```

## Fallback Behavior
If Ollama is not running or the API fails, the system automatically falls back to predefined career suggestions based on the student's selected interests and skills.

## Customization
You can easily customize:
- Interest and skill options in the form
- Career suggestion templates in the fallback logic
- UI styling and layout
- Ollama API parameters (temperature, top_p, max_tokens)

## Troubleshooting

### Common Issues:

1. **"Ollama API error"**: 
   - Make sure Ollama is running: `ollama serve`
   - Check if the model is installed: `ollama list`
   - Verify the model name is correct: `llama3.2`

2. **"Connection refused"**:
   - Ensure Ollama is running on port 11434
   - Check if another service is using the port
   - Restart Ollama service

3. **"Model not found"**:
   - Install the model: `ollama pull llama3.2`
   - Check available models: `ollama list`

4. **Slow responses**:
   - This is normal for the first request as the model loads
   - Subsequent requests should be faster
   - Consider using a smaller model if performance is critical

### Performance Tips:
- Keep Ollama running in the background
- The first request may take 10-30 seconds to load the model
- Subsequent requests should be much faster (2-5 seconds)
- Consider using `llama3.2:1b` for faster responses if you don't need the full model quality

### System Requirements:
- At least 4GB RAM available for the model
- 2GB disk space for the model
- Modern CPU (GPU acceleration available but not required)
