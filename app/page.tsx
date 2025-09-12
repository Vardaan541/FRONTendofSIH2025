'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { GraduationCap, User, Shield, ArrowRight } from 'lucide-react'
import LoginForm from '@/components/LoginForm'
import SignupForm, { SignupData } from '@/components/SignupForm'
import LoadingSpinner from '@/components/LoadingSpinner'

type AppState = 'role-selection' | 'login' | 'signup' | 'loading' | 'dashboard'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('role-selection')
  const [selectedRole, setSelectedRole] = useState<'student' | 'alumni' | 'admin' | 'developer' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useStore()

  const handleRoleSelection = (role: 'student' | 'alumni' | 'admin' | 'developer') => {
    console.log('Role selected:', role) // Debug log
    
    if (role === 'admin') {
      // Redirect directly to admin login page
      router.push('/admin/login')
      return
    }
    
    if (role === 'developer') {
      // Redirect directly to developer login page
      router.push('/developer/login')
      return
    }
    
    setSelectedRole(role)
    setAppState('login')
  }

  const handleSignupClick = (role: 'student' | 'alumni') => {
    console.log('Signup selected for role:', role) // Debug log
    setSelectedRole(role)
    setAppState('signup')
  }

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true)
    
    try {
      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      console.log('Login successful:', data.user) // Debug log
      setUser(data.user)
      setAppState('loading')
      
      // Navigate to appropriate dashboard
      setTimeout(() => {
        console.log('Navigating to:', `/${selectedRole}`) // Debug log
        router.push(`/${selectedRole}`)
      }, 1500)
    } catch (error) {
      console.error('Login error:', error)
      alert(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (userData: SignupData) => {
    setIsLoading(true)
    
    try {
      // Call signup API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          role: selectedRole
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      console.log('Signup successful:', data.user) // Debug log
      setUser(data.user)
      setAppState('loading')
      
      // Navigate to appropriate dashboard
      setTimeout(() => {
        console.log('Navigating to:', `/${selectedRole}`) // Debug log
        router.push(`/${selectedRole}`)
      }, 1500)
    } catch (error) {
      console.error('Signup error:', error)
      alert(error instanceof Error ? error.message : 'Signup failed')
    } finally {
      setIsLoading(false)
    }
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
        onSignup={selectedRole !== 'admin' ? () => handleSignupClick(selectedRole as 'student' | 'alumni') : undefined}
        isLoading={isLoading}
      />
    )
  }

  if (appState === 'signup' && selectedRole && (selectedRole === 'student' || selectedRole === 'alumni')) {
    return (
      <SignupForm
        role={selectedRole}
        onBack={handleBackToRoleSelection}
        onSignup={handleSignup}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Student Role */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Student</h3>
              <p className="text-gray-600 mb-6">
                Access your profile, connect with alumni, book mentoring sessions, and explore career paths
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => handleRoleSelection('student')}
                  className="w-full flex items-center justify-center text-blue-600 font-semibold py-2 px-4 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={() => handleSignupClick('student')}
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Alumni Role */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Alumni</h3>
              <p className="text-gray-600 mb-6">
                Manage your profile, connect with students, accept mentoring requests, and share insights
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => handleRoleSelection('alumni')}
                  className="w-full flex items-center justify-center text-green-600 font-semibold py-2 px-4 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={() => handleSignupClick('alumni')}
                  className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Admin Role */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin</h3>
              <p className="text-gray-600 mb-6">
                Manage platform settings, moderate content, and oversee user interactions
              </p>
              <button
                onClick={() => handleRoleSelection('admin')}
                className="w-full flex items-center justify-center text-purple-600 font-semibold py-2 px-4 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Admin Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Developer Role */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Developer</h3>
              <p className="text-gray-600 mb-6">
                Full platform access for development, testing, and debugging all features
              </p>
              <button
                onClick={() => handleRoleSelection('developer')}
                className="w-full flex items-center justify-center text-orange-600 font-semibold py-2 px-4 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Developer Portal
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
