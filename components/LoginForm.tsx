'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, ArrowLeft, ArrowRight, Lock, User, Mail, Shield, Sparkles } from 'lucide-react'

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
  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
          gradient: 'from-blue-500 via-blue-600 to-indigo-600',
          bgGradient: 'from-blue-50 via-indigo-50 to-purple-50',
          demoCredentials: { email: 'student@university.edu', password: 'student123' }
        }
      case 'alumni':
        return {
          title: 'Alumni Login',
          subtitle: 'Access your alumni dashboard',
          icon: '👨‍💼',
          color: 'green',
          gradient: 'from-emerald-500 via-green-600 to-teal-600',
          bgGradient: 'from-emerald-50 via-green-50 to-teal-50',
          demoCredentials: { email: 'alumni@university.edu', password: 'alumni123' }
        }
      case 'admin':
        return {
          title: 'Admin Login',
          subtitle: 'Access admin controls',
          icon: '👑',
          color: 'purple',
          gradient: 'from-purple-500 via-violet-600 to-indigo-600',
          bgGradient: 'from-purple-50 via-violet-50 to-indigo-50',
          demoCredentials: { email: 'admin@university.edu', password: 'admin123' }
        }
    }
  }

  const roleInfo = getRoleInfo()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${roleInfo.bgGradient} flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 mb-8 group ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="group-hover:underline">Back to Role Selection</span>
        </button>

        {/* Login Card */}
        <div className={`bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 relative overflow-hidden transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`} style={{ transitionDelay: '0.2s' }}>
          {/* Card Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${roleInfo.gradient} opacity-5 rounded-3xl`}></div>
          
          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${roleInfo.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg transform transition-all duration-500 hover:scale-110 hover:rotate-3 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`} style={{ transitionDelay: '0.3s' }}>
              <span className="text-2xl sm:text-3xl filter drop-shadow-lg">{roleInfo.icon}</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${roleInfo.gradient} bg-clip-text text-transparent mb-2 sm:mb-3 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`} style={{ transitionDelay: '0.4s' }}>
              {roleInfo.title}
            </h1>
            <p className={`text-gray-600 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`} style={{ transitionDelay: '0.5s' }}>
              {roleInfo.subtitle}
            </p>
          </div>

          {/* Demo Credentials */}
          <div className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 border border-gray-200/50 transition-all duration-500 hover:shadow-lg ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} style={{ transitionDelay: '0.6s' }}>
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-gray-700">Demo Credentials</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span><strong>Email:</strong> {roleInfo.demoCredentials.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span><strong>Password:</strong> {roleInfo.demoCredentials.password}</span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`} style={{ transitionDelay: '0.7s' }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                Email Address
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                  focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-12 pr-4 py-3 sm:py-4 border-2 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl ${
                    errors.email
                      ? 'border-red-300 focus:ring-4 focus:ring-red-100 focus:border-red-500'
                      : focusedField === 'email'
                      ? 'border-blue-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-500'
                      : 'border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400'
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={errors.email ? "true" : "false"}
                  autoComplete="email"
                  required
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-600 animate-pulse" role="alert">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`} style={{ transitionDelay: '0.8s' }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
                Password
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                  focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-12 pr-14 py-3 sm:py-4 border-2 rounded-2xl bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl ${
                    errors.password
                      ? 'border-red-300 focus:ring-4 focus:ring-red-100 focus:border-red-500'
                      : focusedField === 'password'
                      ? 'border-blue-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-500'
                      : 'border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  aria-invalid={errors.password ? "true" : "false"}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors duration-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-2 text-sm text-red-600 animate-pulse" role="alert">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className={`flex items-center justify-between transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`} style={{ transitionDelay: '0.9s' }}>
              <div className="flex items-center group">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200 group-hover:scale-110"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div className={`transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`} style={{ transitionDelay: '1s' }}>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 sm:py-4 px-6 border border-transparent rounded-2xl shadow-lg text-sm font-semibold text-white focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r ${roleInfo.gradient} hover:shadow-2xl focus:ring-blue-500`
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className={`mt-8 text-center transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} style={{ transitionDelay: '1.1s' }}>
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              {onSignup && role !== 'admin' ? (
                <button
                  onClick={onSignup}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:underline"
                >
                  Sign up here
                </button>
              ) : (
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:underline">
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
