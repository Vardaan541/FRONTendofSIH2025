'use client'

import { Crown, GraduationCap, User } from 'lucide-react'

interface LoadingSpinnerProps {
  message: string
  role?: 'student' | 'alumni' | 'admin'
}

export default function LoadingSpinner({ message, role }: LoadingSpinnerProps) {
  const getRoleIcon = () => {
    switch (role) {
      case 'student':
        return <GraduationCap className="w-8 h-8 text-blue-600" />
      case 'alumni':
        return <User className="w-8 h-8 text-green-600" />
      case 'admin':
        return <Crown className="w-8 h-8 text-purple-600" />
      default:
        return <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    }
  }

  const getRoleColor = () => {
    switch (role) {
      case 'student':
        return 'from-blue-500 to-blue-600'
      case 'alumni':
        return 'from-green-500 to-green-600'
      case 'admin':
        return 'from-purple-500 to-purple-600'
      default:
        return 'from-blue-500 to-blue-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Icon */}
        <div className="mb-8">
          <div className={`w-20 h-20 bg-gradient-to-r ${getRoleColor()} rounded-2xl flex items-center justify-center mx-auto shadow-xl animate-pulse`}>
            {getRoleIcon()}
          </div>
        </div>

        {/* Loading Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{message}</h2>
          <p className="text-gray-600">Please wait while we set up your dashboard...</p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
