'use client'

import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, Lock, User } from 'lucide-react'

interface LoginFormProps {
  role: 'student' | 'alumni' | 'admin'
  onBack: () => void
  onLogin: (email: string, password: string) => void
  onSignup?: () => void
  isLoading: boolean
}

export default function LoginForm({ role, onBack, onLogin, onSignup, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onLogin(email, password)
    }
  }

  const getRoleInfo = () => {
    switch (role) {
      case 'student':
        return {
          title: 'Student Login',
          subtitle: 'Access your student dashboard',
          icon: '🎓',
          color: 'blue',
          demoCredentials: { email: 'student@university.edu', password: 'student123' }
        }
      case 'alumni':
        return {
          title: 'Alumni Login',
          subtitle: 'Access your alumni dashboard',
          icon: '👨‍💼',
          color: 'green',
          demoCredentials: { email: 'alumni@university.edu', password: 'alumni123' }
        }
      case 'admin':
        return {
          title: 'Admin Login',
          subtitle: 'Access admin controls',
          icon: '👑',
          color: 'purple',
          demoCredentials: { email: 'admin@university.edu', password: 'admin123' }
        }
    }
  }

  const roleInfo = getRoleInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Role Selection</span>
        </button>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-r ${
              roleInfo.color === 'blue' ? 'from-blue-500 to-blue-600' :
              roleInfo.color === 'green' ? 'from-green-500 to-green-600' :
              'from-purple-500 to-purple-600'
            } rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-2xl">{roleInfo.icon}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{roleInfo.title}</h1>
            <p className="text-gray-600">{roleInfo.subtitle}</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Email:</strong> {roleInfo.demoCredentials.email}</p>
              <p><strong>Password:</strong> {roleInfo.demoCredentials.password}</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-enhanced pl-10 ${
                    errors.email
                      ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                      : ''
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`input-enhanced pl-10 pr-12 ${
                    errors.password
                      ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                      : ''
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : `bg-gradient-to-r ${
                      roleInfo.color === 'blue' ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' :
                      roleInfo.color === 'green' ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' :
                      'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                    } focus:ring-blue-500`
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              {onSignup && role !== 'admin' ? (
                <button
                  onClick={onSignup}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up here
                </button>
              ) : (
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Contact administrator
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
