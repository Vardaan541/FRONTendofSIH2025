'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { GraduationCap, User, Shield, ArrowRight } from 'lucide-react'
import LoginForm from '@/components/LoginForm'
import LoadingSpinner from '@/components/LoadingSpinner'

type AppState = 'role-selection' | 'login' | 'loading' | 'dashboard'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('role-selection')
  const [selectedRole, setSelectedRole] = useState<'student' | 'alumni' | 'admin' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useStore()

  const handleRoleSelection = (role: 'student' | 'alumni' | 'admin') => {
    console.log('Role selected:', role) // Debug log
    setSelectedRole(role)
    setAppState('login')
  }

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock user data - in real app, this would come from authentication
    const mockUser = {
      id: '1',
      name: selectedRole === 'student' ? 'John Student' : selectedRole === 'alumni' ? 'Jane Alumni' : 'Admin User',
      email: email,
      role: selectedRole!,
      profileImage: '',
      bio: selectedRole === 'student' ? 'Computer Science Student' : selectedRole === 'alumni' ? 'Software Engineer at Tech Corp' : 'Platform Administrator',
      department: 'Computer Science',
      graduationYear: selectedRole === 'student' ? 2025 : 2020,
      currentPosition: selectedRole === 'alumni' ? 'Senior Software Engineer' : undefined,
      company: selectedRole === 'alumni' ? 'Tech Corp' : undefined,
      followers: selectedRole === 'alumni' ? 150 : 0,
      following: selectedRole === 'student' ? 25 : 0
    }
    
    console.log('Setting user:', mockUser) // Debug log
    setUser(mockUser)
    
    setAppState('loading')
    
    // Navigate to appropriate dashboard
    setTimeout(() => {
      console.log('Navigating to:', `/${selectedRole}`) // Debug log
      router.push(`/${selectedRole}`)
    }, 1500)
  }

  const handleBackToRoleSelection = () => {
    setAppState('role-selection')
    setSelectedRole(null)
  }

  // Render different states
  if (appState === 'login' && selectedRole) {
    return (
      <LoginForm
        role={selectedRole}
        onBack={handleBackToRoleSelection}
        onLogin={handleLogin}
        isLoading={isLoading}
      />
    )
  }

  if (appState === 'loading' && selectedRole) {
    return (
      <LoadingSpinner
        message={`Welcome to your ${selectedRole} dashboard!`}
        role={selectedRole}
      />
    )
  }

  // Default role selection view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Alumni Management Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Digital Platform for Centralized Alumni Data Management and Engagement
          </p>
          <p className="text-lg text-gray-700">
            Choose your role to continue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Student Role */}
          <div 
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={() => handleRoleSelection('student')}
          >
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Student</h3>
              <p className="text-gray-600 mb-6">
                Access your profile, connect with alumni, book mentoring sessions, and explore career paths
              </p>
              <div className="flex items-center justify-center text-blue-600 font-semibold">
                Continue as Student
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </div>

          {/* Alumni Role */}
          <div 
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={() => handleRoleSelection('alumni')}
          >
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Alumni</h3>
              <p className="text-gray-600 mb-6">
                Manage your profile, connect with students, accept mentoring requests, and share insights
              </p>
              <div className="flex items-center justify-center text-green-600 font-semibold">
                Continue as Alumni
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </div>

          {/* Admin Role */}
          <div 
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={() => handleRoleSelection('admin')}
          >
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin</h3>
              <p className="text-gray-600 mb-6">
                Manage platform settings, moderate content, and oversee user interactions
              </p>
              <div className="flex items-center justify-center text-purple-600 font-semibold">
                Continue as Admin
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
