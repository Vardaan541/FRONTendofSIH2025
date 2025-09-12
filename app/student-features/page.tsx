'use client'

import { useRouter } from 'next/navigation'
import { Home, User, Users, Zap, Award, MessageCircle } from 'lucide-react'

export default function StudentFeatures() {
  const router = useRouter()

  const features = [
    {
      name: 'Student Dashboard',
      path: '/student',
      description: 'Main student interface',
      icon: Home,
      color: 'blue'
    },
    {
      name: 'Student Profile',
      path: '/student/profile',
      description: 'Student profile management',
      icon: User,
      color: 'blue'
    },
    {
      name: 'Alumni Network',
      path: '/student/alumni',
      description: 'Connect with alumni',
      icon: Users,
      color: 'blue'
    },
    {
      name: 'Career AI',
      path: '/student/career-ai',
      description: 'AI-powered career guidance',
      icon: Zap,
      color: 'blue'
    },
    {
      name: 'Leaderboard',
      path: '/student/leaderboard',
      description: 'Student rankings',
      icon: Award,
      color: 'blue'
    },
    {
      name: 'Messaging',
      path: '/student/messaging',
      description: 'Student messaging system',
      icon: MessageCircle,
      color: 'blue'
    }
  ]

  const handleFeatureClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-500 w-16 h-16 rounded-lg flex items-center justify-center mr-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Student Features</h1>
              <p className="text-lg text-gray-600 mt-2">6 features available</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                onClick={() => handleFeatureClick(feature.path)}
                className="bg-blue-50 border border-blue-200 rounded-lg p-6 cursor-pointer hover:shadow-md hover:bg-blue-100 transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{feature.name}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded px-3 py-1 inline-block">
                  <span className="text-xs text-gray-600 font-mono">{feature.path}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
