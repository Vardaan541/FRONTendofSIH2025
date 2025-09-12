'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminUser, clearAdminUser, type AdminUser } from '@/lib/auth'
import { 
  Code, 
  Terminal, 
  Users, 
  User, 
  Shield, 
  Settings, 
  BarChart3, 
  Calendar, 
  MessageCircle, 
  Heart, 
  BookOpen, 
  TrendingUp, 
  FileText, 
  Database, 
  Zap, 
  Globe, 
  ArrowRight, 
  LogOut, 
  Home, 
  Search, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Star, 
  Target, 
  Award, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Activity,
  Layers,
  Cpu,
  Server,
  Network,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  Play,
  Pause,
  Square
} from 'lucide-react'

export default function DeveloperDashboard() {
  const [developerUser, setDeveloperUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log('DeveloperDashboard: Checking for developer user data...')
    const user = getAdminUser()
    console.log('DeveloperDashboard: User data:', user)
    
    if (user && user.role === 'developer') {
      setDeveloperUser(user)
    } else {
      // Redirect to login if not authenticated as developer
      router.push('/developer/login')
      return
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    clearAdminUser()
    router.push('/')
  }

  // All available sections in the application
  const sections = [
    {
      category: 'Student Features',
      color: 'blue',
      icon: Users,
      items: [
        { name: 'Student Dashboard', path: '/student', description: 'Main student interface', icon: Home },
        { name: 'Student Profile', path: '/student/profile', description: 'Student profile management', icon: User },
        { name: 'Alumni Network', path: '/student/alumni', description: 'Connect with alumni', icon: Users },
        { name: 'Career AI', path: '/student/career-ai', description: 'AI-powered career guidance', icon: Zap },
        { name: 'Leaderboard', path: '/student/leaderboard', description: 'Student rankings', icon: Award },
        { name: 'Messaging', path: '/student/messaging', description: 'Student messaging system', icon: MessageCircle },
      ]
    },
    {
      category: 'Alumni Features',
      color: 'green',
      icon: User,
      items: [
        { name: 'Alumni Dashboard', path: '/alumni', description: 'Main alumni interface', icon: Home },
        { name: 'Alumni Profile', path: '/alumni/profile', description: 'Alumni profile management', icon: User },
        { name: 'Career Progress', path: '/alumni/career-progress', description: 'Track career milestones', icon: TrendingUp },
        { name: 'Create Post', path: '/alumni/create-post', description: 'Create and share posts', icon: Plus },
        { name: 'Event Requests', path: '/alumni/event-requests', description: 'Manage event requests', icon: Calendar },
        { name: 'Leaderboard', path: '/alumni/leaderboard', description: 'Alumni rankings', icon: Award },
        { name: 'Messaging', path: '/alumni/messaging', description: 'Alumni messaging system', icon: MessageCircle },
        { name: 'Students', path: '/alumni/students', description: 'Connect with students', icon: Users },
      ]
    },
    {
      category: 'Admin Features',
      color: 'purple',
      icon: Shield,
      items: [
        { name: 'Admin Dashboard', path: '/admin', description: 'Main admin interface', icon: Home },
        { name: 'Admin Login', path: '/admin/login', description: 'Admin authentication', icon: Lock },
        { name: 'Students Management', path: '/admin/students', description: 'Manage student accounts', icon: Users },
        { name: 'Alumni Management', path: '/admin/alumni', description: 'Manage alumni accounts', icon: User },
        { name: 'User Management', path: '/admin/users', description: 'General user management', icon: Users },
        { name: 'Analytics', path: '/admin/analytics', description: 'Platform analytics', icon: BarChart3 },
        { name: 'Events', path: '/admin/events', description: 'Event management', icon: Calendar },
        { name: 'Event Approvals', path: '/admin/event-approvals', description: 'Approve events', icon: CheckCircle },
        { name: 'Approvals', path: '/admin/approvals', description: 'General approvals', icon: CheckCircle },
        { name: 'Settings', path: '/admin/settings', description: 'Platform settings', icon: Settings },
        { name: 'Profile', path: '/admin/profile', description: 'Admin profile', icon: User },
        { name: 'Debug', path: '/admin/debug', description: 'Debug tools', icon: Terminal },
      ]
    },
    {
      category: 'API Endpoints',
      color: 'orange',
      icon: Server,
      items: [
        { name: 'Auth Login', path: '/api/auth/login', description: 'Authentication endpoint', icon: Lock },
        { name: 'Auth Signup', path: '/api/auth/signup', description: 'User registration', icon: User },
        { name: 'Career AI', path: '/api/career-ai', description: 'AI career suggestions', icon: Zap },
        { name: 'Donation', path: '/api/donation', description: 'Donation processing', icon: Heart },
        { name: 'Payment', path: '/api/payment', description: 'Payment processing', icon: Heart },
        { name: 'Simple Test', path: '/api/simple-test', description: 'Test endpoint', icon: Play },
        { name: 'Razorpay Test', path: '/api/test-razorpay', description: 'Payment testing', icon: Heart },
      ]
    },
    {
      category: 'Testing & Development',
      color: 'red',
      icon: Code,
      items: [
        { name: 'Testing Home', path: '/testing', description: 'Testing interface', icon: Home },
        { name: 'Leaderboard Test', path: '/testing/leaderboard', description: 'Test leaderboard component', icon: Award },
        { name: 'Test Integration', path: '/test-integration.html', description: 'Integration testing', icon: Globe },
      ]
    },
    {
      category: 'Components',
      color: 'indigo',
      icon: Layers,
      items: [
        { name: 'Admin Layout', path: '/components/AdminLayout.tsx', description: 'Admin layout component', icon: Layers },
        { name: 'Career Progress Modal', path: '/components/CareerProgressModal.tsx', description: 'Career progress modal', icon: TrendingUp },
        { name: 'Career Timeline', path: '/components/CareerTimeline.tsx', description: 'Career timeline component', icon: Clock },
        { name: 'Chat List', path: '/components/ChatList.tsx', description: 'Chat list component', icon: MessageCircle },
        { name: 'Chat View', path: '/components/ChatView.tsx', description: 'Chat view component', icon: MessageCircle },
        { name: 'Comment Modal', path: '/components/CommentModal.tsx', description: 'Comment modal component', icon: MessageCircle },
        { name: 'Donation Modal', path: '/components/DonationModal.tsx', description: 'Donation modal component', icon: Heart },
        { name: 'Loading Spinner', path: '/components/LoadingSpinner.tsx', description: 'Loading spinner component', icon: RefreshCw },
        { name: 'Login Form', path: '/components/LoginForm.tsx', description: 'Login form component', icon: Lock },
        { name: 'Navigation', path: '/components/Navigation.tsx', description: 'Navigation component', icon: Globe },
        { name: 'New Chat Modal', path: '/components/NewChatModal.tsx', description: 'New chat modal component', icon: Plus },
        { name: 'Razorpay Payment', path: '/components/RazorpayPayment.tsx', description: 'Payment component', icon: Heart },
        { name: 'Session Booking Form', path: '/components/SessionBookingForm.tsx', description: 'Session booking form', icon: Calendar },
        { name: 'Signup Form', path: '/components/SignupForm.tsx', description: 'Signup form component', icon: User },
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        border: 'border-blue-200',
        hover: 'hover:from-blue-100 hover:to-cyan-100',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-800 border-blue-200'
      },
      green: {
        bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
        border: 'border-green-200',
        hover: 'hover:from-green-100 hover:to-emerald-100',
        icon: 'text-green-600',
        badge: 'bg-green-100 text-green-800 border-green-200'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-50 to-violet-50',
        border: 'border-purple-200',
        hover: 'hover:from-purple-100 hover:to-violet-100',
        icon: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-800 border-purple-200'
      },
      orange: {
        bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
        border: 'border-orange-200',
        hover: 'hover:from-orange-100 hover:to-amber-100',
        icon: 'text-orange-600',
        badge: 'bg-orange-100 text-orange-800 border-orange-200'
      },
      red: {
        bg: 'bg-gradient-to-br from-red-50 to-rose-50',
        border: 'border-red-200',
        hover: 'hover:from-red-100 hover:to-rose-100',
        icon: 'text-red-600',
        badge: 'bg-red-100 text-red-800 border-red-200'
      },
      indigo: {
        bg: 'bg-gradient-to-br from-indigo-50 to-blue-50',
        border: 'border-indigo-200',
        hover: 'hover:from-indigo-100 hover:to-blue-100',
        icon: 'text-indigo-600',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-200'
      }
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-red-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Developer Portal</h3>
          <p className="text-gray-600">Preparing your development environment...</p>
        </div>
      </div>
    )
  }

  if (!developerUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Developer Portal</h1>
                <p className="text-gray-600">Full platform access for development and testing</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{developerUser.name}</p>
                <p className="text-xs text-gray-600">{developerUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome, {developerUser.name}!</h2>
                <p className="text-orange-100 text-lg">Access all platform features for development and testing</p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Development Mode</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                  <Terminal className="w-5 h-5" />
                  <span className="text-sm font-medium">Full Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => {
            const colors = getColorClasses(section.color)
            return (
              <div key={section.category} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                {/* Section Header */}
                <div className={`bg-gradient-to-r ${colors.bg} px-6 py-5 border-b border-gray-100`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 bg-gradient-to-r from-${section.color}-500 to-${section.color}-600 rounded-xl shadow-md`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{section.category}</h3>
                      <p className="text-gray-600 text-sm">{section.items.length} features available</p>
                    </div>
                  </div>
                </div>

                {/* Section Items */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {section.items.map((item, itemIndex) => (
                      <a
                        key={item.name}
                        href={item.path}
                        target={item.path.startsWith('/api/') || item.path.includes('.tsx') || item.path.includes('.html') ? '_blank' : '_self'}
                        className={`group relative p-4 rounded-xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} ${colors.hover} transition-all duration-300 text-left transform hover:scale-105 hover:shadow-md`}
                        style={{ animationDelay: `${(sectionIndex * 100) + (itemIndex * 50)}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <item.icon className={`w-6 h-6 ${colors.icon} group-hover:scale-110 transition-transform duration-300`} />
                            {item.path.startsWith('/api/') && (
                              <span className={`text-xs px-2 py-1 rounded-full font-bold border ${colors.badge}`}>
                                API
                              </span>
                            )}
                            {item.path.includes('.tsx') && (
                              <span className={`text-xs px-2 py-1 rounded-full font-bold border ${colors.badge}`}>
                                Component
                              </span>
                            )}
                            {item.path.includes('.html') && (
                              <span className={`text-xs px-2 py-1 rounded-full font-bold border ${colors.badge}`}>
                                Test
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                              {item.path}
                            </span>
                            <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => window.open('/api/simple-test', '_blank')}
              className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200"
            >
              <Play className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-gray-900">Test API</span>
            </button>
            <button
              onClick={() => window.open('/admin/debug', '_blank')}
              className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-violet-100 transition-all duration-200"
            >
              <Terminal className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-gray-900">Debug Tools</span>
            </button>
            <button
              onClick={() => window.open('/test-integration.html', '_blank')}
              className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-200"
            >
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">Integration Test</span>
            </button>
            <button
              onClick={() => window.open('/admin/analytics', '_blank')}
              className="flex items-center justify-center space-x-2 p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all duration-200"
            >
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-gray-900">Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
