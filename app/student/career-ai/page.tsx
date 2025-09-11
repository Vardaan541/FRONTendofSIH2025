'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import { Brain, Send, Lightbulb, Target, TrendingUp, Users, BookOpen } from 'lucide-react'

export default function CareerAI() {
  const { user } = useStore()
  const router = useRouter()
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'ai',
      message: 'Hello! I\'m your Career AI assistant. I can help you with career guidance, skill recommendations, industry insights, and more. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'student') {
      router.push('/')
      return
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: question,
      timestamp: new Date()
    }

    setChatHistory(prev => [...prev, userMessage])
    setQuestion('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(question)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        message: aiResponse,
        timestamp: new Date()
      }
      setChatHistory(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('career') || lowerQuestion.includes('job')) {
      return "Based on your Computer Science background, I recommend exploring these career paths:\n\n1. **Software Development**: Full-stack, frontend, or backend development\n2. **Data Science**: Machine learning, AI, and analytics\n3. **Product Management**: Technical product roles\n4. **DevOps/Cloud**: Infrastructure and deployment\n\nConsider building projects in your areas of interest and networking with alumni in these fields!"
    }
    
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('learn')) {
      return "Here are the most in-demand skills for CS graduates:\n\n**Technical Skills:**\n- Programming: Python, JavaScript, Java, C++\n- Frameworks: React, Node.js, Django, Spring\n- Databases: SQL, MongoDB, PostgreSQL\n- Cloud: AWS, Azure, Google Cloud\n\n**Soft Skills:**\n- Problem-solving and critical thinking\n- Communication and teamwork\n- Project management\n- Continuous learning mindset"
    }
    
    if (lowerQuestion.includes('interview') || lowerQuestion.includes('resume')) {
      return "For technical interviews and resume building:\n\n**Resume Tips:**\n- Highlight projects with measurable impact\n- Include relevant coursework and GPA\n- Show leadership and teamwork experience\n- Use action verbs and quantify achievements\n\n**Interview Prep:**\n- Practice coding problems on LeetCode/HackerRank\n- Prepare STAR method stories for behavioral questions\n- Research the company and role thoroughly\n- Practice explaining your projects clearly"
    }
    
    if (lowerQuestion.includes('salary') || lowerQuestion.includes('pay')) {
      return "Here are average starting salaries for CS graduates:\n\n**Software Developer**: $70,000 - $120,000\n**Data Scientist**: $80,000 - $130,000\n**Product Manager**: $90,000 - $140,000\n**DevOps Engineer**: $85,000 - $125,000\n\n*Salaries vary by location, company size, and experience. Consider cost of living and growth opportunities when evaluating offers.*"
    }
    
    return "That's a great question! I'd be happy to help you with career guidance. Could you be more specific about what aspect of your career development you'd like to explore? I can help with:\n\n- Career path recommendations\n- Skill development strategies\n- Interview preparation\n- Industry insights\n- Networking tips\n- Resume optimization"
  }

  const quickQuestions = [
    "What career paths are available in Computer Science?",
    "What skills should I learn to get a job in tech?",
    "How do I prepare for technical interviews?",
    "What's the average salary for software developers?",
    "How can I build a strong portfolio?",
    "What are the best programming languages to learn?"
  ]

  if (!user || user.role !== 'student') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="student" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Career AI Assistant</h1>
              <p className="text-gray-600">Get personalized career guidance and insights</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Career AI Assistant</h3>
                    <p className="text-sm text-gray-600">Always here to help with your career questions</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask me anything about your career..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !question.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                Quick Questions
              </h3>
              <div className="space-y-2">
                {quickQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(q)}
                    className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Career Insights */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Career Insights
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-900 mb-1">Hot Skills 2024</h4>
                  <p className="text-sm text-blue-700">AI/ML, Cloud Computing, Cybersecurity</p>
                </div>
                <div className="p-3 bg-green-50 rounded-md">
                  <h4 className="font-medium text-green-900 mb-1">Growing Fields</h4>
                  <p className="text-sm text-green-700">Data Science, DevOps, Product Management</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-md">
                  <h4 className="font-medium text-purple-900 mb-1">Remote Work</h4>
                  <p className="text-sm text-purple-700">85% of tech companies offer remote options</p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-500" />
                Learning Resources
              </h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <h4 className="font-medium text-gray-900">FreeCodeCamp</h4>
                  <p className="text-sm text-gray-600">Free coding tutorials</p>
                </a>
                <a href="#" className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <h4 className="font-medium text-gray-900">Coursera</h4>
                  <p className="text-sm text-gray-600">University courses</p>
                </a>
                <a href="#" className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <h4 className="font-medium text-gray-900">LeetCode</h4>
                  <p className="text-sm text-gray-600">Coding interview prep</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
