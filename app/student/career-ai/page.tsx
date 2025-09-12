'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import { Brain, Send, Lightbulb, Target, TrendingUp, Users, BookOpen, CheckCircle, ArrowRight, Star, MapPin, Clock, DollarSign } from 'lucide-react'

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

export default function CareerAI() {
  const { user } = useStore()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<'form' | 'loading' | 'results'>('form')
  const [formData, setFormData] = useState({
    interests: [] as string[],
    customInterests: '',
    skills: [] as string[],
    customSkills: '',
    experience: '',
    education: '',
    goals: ''
  })
  const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Allow access even without authentication for demo purposes
    // if (!user || user.role !== 'student') {
    //   router.push('/')
    //   return
    // }
  }, [user, router])

  const interestOptions = [
    'Software Development', 'Data Science', 'Artificial Intelligence', 'Web Development',
    'Mobile Development', 'Cybersecurity', 'Cloud Computing', 'DevOps',
    'Product Management', 'UI/UX Design', 'Game Development', 'Blockchain',
    'Machine Learning', 'Robotics', 'IoT', 'Digital Marketing',
    'Business Analytics', 'Project Management', 'Consulting', 'Entrepreneurship'
  ]

  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'SQL',
    'HTML/CSS', 'Git', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning',
    'Data Analysis', 'Problem Solving', 'Communication', 'Leadership',
    'Project Management', 'Agile/Scrum', 'Database Design', 'API Development'
  ]

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleCustomInterestsChange = (value: string) => {
    setFormData(prev => ({ ...prev, customInterests: value }))
  }

  const handleCustomSkillsChange = (value: string) => {
    setFormData(prev => ({ ...prev, customSkills: value }))
  }

  const parseCustomInputs = (customText: string): string[] => {
    if (!customText.trim()) return []
    return customText
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Combine selected and custom inputs
    const allInterests = [...formData.interests, ...parseCustomInputs(formData.customInterests)]
    const allSkills = [...formData.skills, ...parseCustomInputs(formData.customSkills)]
    
    if (allInterests.length === 0) {
      alert('Please select at least one interest from the options or type your interests in the custom field')
      return
    }
    
    if (allSkills.length === 0) {
      alert('Please select at least one skill from the options or type your skills in the custom field')
      return
    }

    setCurrentStep('loading')
    setIsLoading(true)

    try {
      // Prepare data with combined interests and skills
      const submissionData = {
        interests: allInterests,
        skills: allSkills,
        experience: formData.experience,
        education: formData.education,
        goals: formData.goals
      }

      // Call Llama 3.2 API for career suggestions
      const response = await fetch('/api/career-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        throw new Error('Failed to get career suggestions')
      }

      const suggestions = await response.json()
      setCareerSuggestions(suggestions)
      setCurrentStep('results')
    } catch (error) {
      console.error('Error getting career suggestions:', error)
      // Fallback to mock data if API fails
      setCareerSuggestions(generateMockSuggestions())
      setCurrentStep('results')
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockSuggestions = (): CareerSuggestion[] => {
    return [
      {
        title: "Full Stack Developer",
        description: "Build end-to-end web applications using modern technologies. Perfect for those who enjoy both frontend and backend development.",
        matchScore: 95,
        requiredSkills: ["JavaScript", "React", "Node.js", "SQL"],
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
      },
      {
        title: "Data Scientist",
        description: "Extract insights from data using statistical analysis and machine learning. Ideal for analytical minds who love problem-solving.",
        matchScore: 88,
        requiredSkills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
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
      },
      {
        title: "Product Manager",
        description: "Lead product development from conception to launch. Great for those who enjoy strategy, user research, and cross-functional collaboration.",
        matchScore: 82,
        requiredSkills: ["Problem Solving", "Communication", "Project Management", "Leadership"],
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
      }
    ]
  }

  // Allow access even without authentication for demo purposes
  // if (!user || user.role !== 'student') {
  //   return null
  // }

  const renderForm = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
            </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career AI Assistant</h1>
          <p className="text-gray-600">Tell us about your interests and skills to get personalized career recommendations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Interests Section */}
                  <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-500" />
              What are your interests?
            </h2>
            <p className="text-gray-600 mb-4">Select all areas that interest you (you can select multiple)</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {interest}
                </button>
              ))}
                  </div>
            
            {/* Custom Interests Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or type your own interests (separate with commas)
              </label>
              <input
                type="text"
                value={formData.customInterests}
                onChange={(e) => handleCustomInterestsChange(e.target.value)}
                placeholder="e.g., Photography, Music Production, Environmental Science"
                className="input-enhanced focus:ring-purple-100 focus:border-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Selected: {formData.interests.length} | Custom: {parseCustomInputs(formData.customInterests).length}
              </p>
                </div>
              </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />
              What skills do you have?
            </h2>
            <p className="text-gray-600 mb-4">Select all skills you currently have or are learning</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    formData.skills.includes(skill)
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            
            {/* Custom Skills Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or type your own skills (separate with commas)
              </label>
              <input
                type="text"
                value={formData.customSkills}
                onChange={(e) => handleCustomSkillsChange(e.target.value)}
                placeholder="e.g., Adobe Photoshop, Public Speaking, Financial Analysis"
                className="input-enhanced"
              />
              <p className="text-xs text-gray-500 mt-1">
                Selected: {formData.skills.length} | Custom: {parseCustomInputs(formData.customSkills).length}
                      </p>
                    </div>
                  </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Experience Level
              </label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="select-enhanced"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3+ years)</option>
              </select>
                      </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Level
              </label>
              <select
                value={formData.education}
                onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                className="select-enhanced"
              >
                <option value="">Select education level</option>
                <option value="high-school">High School</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
                    </div>
                  </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Career Goals (Optional)
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
              placeholder="Tell us about your career aspirations and goals..."
              className="textarea-enhanced h-24"
            />
              </div>

          <div className="text-center">
                  <button
                    type="submit"
              disabled={formData.interests.length === 0 || formData.skills.length === 0}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center mx-auto"
                  >
              <Brain className="w-5 h-5 mr-2" />
              Get Career Recommendations
                  </button>
          </div>
                </form>
              </div>
            </div>
  )

  const renderLoading = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Brain className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Profile</h2>
        <p className="text-gray-600 mb-6">Our AI is processing your interests and skills to find the best career matches...</p>
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )

  const renderResults = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Career Recommendations</h1>
        <p className="text-gray-600">Based on your interests and skills, here are the best career paths for you</p>
          </div>

          <div className="space-y-6">
        {careerSuggestions.map((career, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 mr-3">{career.title}</h3>
                  <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 mr-1" />
                    {career.matchScore}% Match
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{career.description}</p>
                </div>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Salary Range</p>
                  <p className="font-semibold text-blue-900">{career.salaryRange}</p>
                    </div>
                  </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Growth</p>
                  <p className="font-semibold text-green-900">{career.growthProspect}</p>
                      </div>
                    </div>
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Time to Achieve</p>
                  <p className="font-semibold text-purple-900">{career.timeToAchieve}</p>
                  </div>
              </div>
              <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Career Path</p>
                  <p className="font-semibold text-orange-900">{career.careerPath.length} Levels</p>
                </div>
            </div>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                ))}
              </div>
            </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-green-500" />
                  Career Progression
                </h4>
                <div className="space-y-2">
                  {career.careerPath.map((level, levelIndex) => (
                    <div key={levelIndex} className="flex items-center">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                        {levelIndex + 1}
                </div>
                      <span className="text-gray-700">{level}</span>
                </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2 text-purple-500" />
                Next Steps to Get Started
              </h4>
              <div className="space-y-2">
                {career.nextSteps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start">
                    <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      {stepIndex + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        </div>

      <div className="text-center mt-8">
        <button
          onClick={() => {
            setCurrentStep('form')
            setCareerSuggestions([])
            setFormData({
              interests: [],
              customInterests: '',
              skills: [],
              customSkills: '',
              experience: '',
              education: '',
              goals: ''
            })
          }}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Start Over
        </button>
          </div>
        </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="student" />
      
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'form' && renderForm()}
        {currentStep === 'loading' && renderLoading()}
        {currentStep === 'results' && renderResults()}
      </div>
    </div>
  )
}
