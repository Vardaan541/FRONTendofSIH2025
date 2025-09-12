'use client'

import { useRouter } from 'next/navigation'
import { Home, User, TrendingUp, Plus, Calendar, Award, MessageCircle, Users } from 'lucide-react'

export default function AlumniFeatures() {
  const router = useRouter()

  const features = [
    {
      name: 'Alumni Dashboard',
      path: '/alumni',
      description: 'Main alumni interface',
      icon: Home,
      color: 'green'
    },
    {
      name: 'Alumni Profile',
      path: '/alumni/profile',
      description: 'Alumni profile management',
      icon: User,
      color: 'green'
    },
    {
      name: 'Career Progress',
      path: '/alumni/career-progress',
      description: 'Track career milestones',
      icon: TrendingUp,
      color: 'green'
    },
    {
      name: 'Create Post',
      path: '/alumni/create-post',
      description: 'Create and share posts',
      icon: Plus,
      color: 'green'
    },
    {
      name: 'Event Requests',
      path: '/alumni/event-requests',
      description: 'Manage event requests',
      icon: Calendar,
      color: 'green'
    },
    {
      name: 'Leaderboard',
      path: '/alumni/leaderboard',
      description: 'Alumni rankings',
      icon: Award,
      color: 'green'
    },
    {
      name: 'Messaging',
      path: '/alumni/messaging',
      description: 'Alumni messaging system',
      icon: MessageCircle,
      color: 'green'
    },
    {
      name: 'Students',
      path: '/alumni/students',
      description: 'Connect with students',
      icon: Users,
      color: 'green'
    }
  ]

  const handleFeatureClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-500 w-16 h-16 rounded-lg flex items-center justify-center mr-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Alumni Features</h1>
              <p className="text-lg text-gray-600 mt-2">8 features available</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                onClick={() => handleFeatureClick(feature.path)}
                className="bg-green-50 border border-green-200 rounded-lg p-6 cursor-pointer hover:shadow-md hover:bg-green-100 transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
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
