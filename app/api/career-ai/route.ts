import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { interests, skills, experience, education, goals } = body

    // Prepare the prompt for Llama 3.2 via Ollama
    const prompt = `You are a career guidance AI assistant. Based on the following student profile, suggest 3-5 career paths with detailed information.

Student Profile:
- Interests: ${interests.join(', ')}
- Skills: ${skills.join(', ')}
- Experience Level: ${experience || 'Not specified'}
- Education: ${education || 'Not specified'}
- Career Goals: ${goals || 'Not specified'}

Please provide career suggestions in the following JSON format:
[
  {
    "title": "Career Title",
    "description": "Detailed description of the career",
    "matchScore": 85,
    "requiredSkills": ["skill1", "skill2", "skill3"],
    "careerPath": ["Entry Level", "Mid Level", "Senior Level", "Leadership"],
    "salaryRange": "$X,XXX - $X,XXX",
    "growthProspect": "High/Medium/Low",
    "timeToAchieve": "X-Y months/years",
    "nextSteps": [
      "Step 1 to get started",
      "Step 2 to progress",
      "Step 3 to advance",
      "Step 4 to excel"
    ]
  }
]

Focus on:
1. Careers that match their interests and skills
2. Realistic salary ranges for entry to mid-level positions
3. Practical next steps they can take immediately
4. Growth prospects in the current market
5. Time estimates based on their current experience level

Return only valid JSON, no additional text.`

    // Call Ollama API for Llama 3.2
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 2000
        }
      })
    })

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.status} ${ollamaResponse.statusText}`)
    }

    const ollamaData = await ollamaResponse.json()
    let suggestions: CareerSuggestion[] = []

    try {
      // Extract JSON from the Ollama response
      const responseText = ollamaData.response || ''
      console.log('Ollama response:', responseText)
      
      // Try to find JSON in the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/)
      
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0])
      } else {
        // If no JSON found, try to parse the entire response
        const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        suggestions = JSON.parse(cleanedResponse)
      }
    } catch (parseError) {
      console.error('Error parsing Ollama response:', parseError)
      console.log('Raw response:', ollamaData.response)
      // Fallback to mock data if parsing fails
      suggestions = generateFallbackSuggestions(interests, skills)
    }

    return NextResponse.json(suggestions)

  } catch (error) {
    console.error('Error in career-ai API:', error)
    
    // Return fallback suggestions if API fails
    const body = await request.json()
    const { interests, skills } = body
    const fallbackSuggestions = generateFallbackSuggestions(interests, skills)
    
    return NextResponse.json(fallbackSuggestions)
  }
}

function generateFallbackSuggestions(interests: string[], skills: string[]): CareerSuggestion[] {
  // Generate suggestions based on interests and skills
  const suggestions: CareerSuggestion[] = []

  // Check for software development interests/skills
  if (interests.some(i => ['Software Development', 'Web Development', 'Mobile Development'].includes(i)) ||
      skills.some(s => ['JavaScript', 'Python', 'Java', 'React', 'Node.js'].includes(s))) {
    suggestions.push({
      title: "Full Stack Developer",
      description: "Build end-to-end web applications using modern technologies. Perfect for those who enjoy both frontend and backend development.",
      matchScore: 95,
      requiredSkills: ["JavaScript", "React", "Node.js", "SQL", "Git"],
      careerPath: ["Junior Developer", "Mid-level Developer", "Senior Developer", "Tech Lead"],
      salaryRange: "$70,000 - $130,000",
      growthProspect: "High",
      timeToAchieve: "6-12 months",
      nextSteps: [
        "Complete a full-stack bootcamp or course",
        "Build 3-5 portfolio projects",
        "Contribute to open source projects",
        "Apply for junior developer positions"
      ]
    })
  }

  // Check for data science interests/skills
  if (interests.some(i => ['Data Science', 'Artificial Intelligence', 'Machine Learning'].includes(i)) ||
      skills.some(s => ['Python', 'Machine Learning', 'Data Analysis', 'SQL'].includes(s))) {
    suggestions.push({
      title: "Data Scientist",
      description: "Extract insights from data using statistical analysis and machine learning. Ideal for analytical minds who love problem-solving.",
      matchScore: 88,
      requiredSkills: ["Python", "Machine Learning", "Data Analysis", "SQL", "Statistics"],
      careerPath: ["Junior Data Analyst", "Data Scientist", "Senior Data Scientist", "Data Science Manager"],
      salaryRange: "$80,000 - $150,000",
      growthProspect: "Very High",
      timeToAchieve: "12-18 months",
      nextSteps: [
        "Learn Python and data science libraries (pandas, scikit-learn)",
        "Complete Kaggle competitions",
        "Build data science projects",
        "Get certified in machine learning"
      ]
    })
  }

  // Check for product management interests/skills
  if (interests.some(i => ['Product Management', 'Business Analytics', 'Consulting'].includes(i)) ||
      skills.some(s => ['Problem Solving', 'Communication', 'Project Management', 'Leadership'].includes(s))) {
    suggestions.push({
      title: "Product Manager",
      description: "Lead product development from conception to launch. Great for those who enjoy strategy, user research, and cross-functional collaboration.",
      matchScore: 82,
      requiredSkills: ["Problem Solving", "Communication", "Project Management", "Leadership", "Analytics"],
      careerPath: ["Associate PM", "Product Manager", "Senior PM", "Director of Product"],
      salaryRange: "$90,000 - $160,000",
      growthProspect: "High",
      timeToAchieve: "18-24 months",
      nextSteps: [
        "Take product management courses",
        "Lead a project or initiative",
        "Learn user research and analytics",
        "Network with product professionals"
      ]
    })
  }

  // Check for cybersecurity interests/skills
  if (interests.some(i => ['Cybersecurity'].includes(i)) ||
      skills.some(s => ['Problem Solving', 'Communication'].includes(s))) {
    suggestions.push({
      title: "Cybersecurity Analyst",
      description: "Protect organizations from cyber threats and ensure data security. Perfect for those who enjoy problem-solving and staying ahead of security trends.",
      matchScore: 85,
      requiredSkills: ["Problem Solving", "Communication", "Network Security", "Risk Assessment", "Incident Response"],
      careerPath: ["Security Analyst", "Senior Security Analyst", "Security Engineer", "Security Manager"],
      salaryRange: "$75,000 - $140,000",
      growthProspect: "Very High",
      timeToAchieve: "12-18 months",
      nextSteps: [
        "Get cybersecurity certifications (CompTIA Security+, CISSP)",
        "Learn about network security and penetration testing",
        "Practice with cybersecurity labs and challenges",
        "Apply for entry-level security positions"
      ]
    })
  }

  // Check for cloud/devops interests/skills
  if (interests.some(i => ['Cloud Computing', 'DevOps'].includes(i)) ||
      skills.some(s => ['AWS', 'Docker', 'Kubernetes', 'Git'].includes(s))) {
    suggestions.push({
      title: "DevOps Engineer",
      description: "Bridge development and operations to improve software delivery and infrastructure management. Great for those who enjoy automation and system optimization.",
      matchScore: 90,
      requiredSkills: ["AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Linux"],
      careerPath: ["Junior DevOps Engineer", "DevOps Engineer", "Senior DevOps Engineer", "DevOps Manager"],
      salaryRange: "$85,000 - $145,000",
      growthProspect: "High",
      timeToAchieve: "12-18 months",
      nextSteps: [
        "Learn cloud platforms (AWS, Azure, GCP)",
        "Master containerization (Docker, Kubernetes)",
        "Understand CI/CD pipelines",
        "Get cloud certifications"
      ]
    })
  }

  // If no specific matches, provide general tech career suggestions
  if (suggestions.length === 0) {
    suggestions.push({
      title: "Software Developer",
      description: "Create software applications and systems. A versatile career path with many opportunities for growth and specialization.",
      matchScore: 75,
      requiredSkills: ["Programming", "Problem Solving", "Communication", "Version Control"],
      careerPath: ["Junior Developer", "Developer", "Senior Developer", "Tech Lead"],
      salaryRange: "$65,000 - $120,000",
      growthProspect: "High",
      timeToAchieve: "12-18 months",
      nextSteps: [
        "Choose a programming language to learn (Python, JavaScript, Java)",
        "Complete coding bootcamp or online courses",
        "Build personal projects",
        "Apply for entry-level positions"
      ]
    })
  }

  return suggestions.slice(0, 3) // Return top 3 suggestions
}
