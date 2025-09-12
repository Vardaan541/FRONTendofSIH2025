'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getAdminUser, clearAdminUser, type AdminUser } from '@/lib/auth'
import {
  Menu,
  X,
  Search,
  Bell,
  HelpCircle,
  User,
  LogOut,
  Settings,
  Shield,
  ChevronDown,
  Home,
  Calendar,
  BarChart3,
  Users,
  UserCheck,
  GraduationCap,
  CheckCircle,
  Heart,
  Briefcase,
  MessageSquare,
  Cog,
  FileText,
  MoreHorizontal,
  Zap,
  Activity,
  TrendingUp,
  Globe,
  Star
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

// AdminUser interface is now imported from lib/auth

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log('AdminLayout: Checking for admin user data...')
    const user = getAdminUser()
    
    if (user) {
      console.log('AdminLayout: User found:', user)
      setAdminUser(user)
      setIsLoading(false)
    } else {
      console.log('AdminLayout: No user found, redirecting to login')
      router.push('/admin/login')
      return
    }
  }, [router])

  const handleLogout = () => {
    clearAdminUser()
    router.push('/admin/login')
  }

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: Home, 
      current: pathname === '/admin',
      description: 'Overview and analytics'
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: BarChart3, 
      current: pathname === '/admin/analytics',
      description: 'Reports and insights'
    },
    { 
      name: 'Events', 
      href: '/admin/events', 
      icon: Calendar, 
      current: pathname === '/admin/events',
      description: 'Manage events and reunions'
    },
    { 
      name: 'Profile', 
      href: '/admin/profile', 
      icon: User, 
      current: pathname === '/admin/profile',
      description: 'Your admin profile'
    },
  ]

  const userManagement = [
    { 
      name: 'All Users', 
      href: '/admin/users', 
      icon: Users,
      description: 'Manage admin users'
    },
    { 
      name: 'Alumni', 
      href: '/admin/alumni', 
      icon: UserCheck,
      description: 'Alumni profiles'
    },
    { 
      name: 'Students', 
      href: '/admin/students', 
      icon: GraduationCap,
      description: 'Student management'
    },
    { 
      name: 'Approvals', 
      href: '/admin/approvals', 
      icon: CheckCircle,
      description: 'Pending approvals'
    },
  ]

  const contentManagement = [
    { 
      name: 'Donations', 
      href: '/admin/donations', 
      icon: Heart,
      description: 'Fund management'
    },
    { 
      name: 'Jobs & Internships', 
      href: '/admin/jobs', 
      icon: Briefcase,
      description: 'Career opportunities'
    },
    { 
      name: 'Communications', 
      href: '/admin/communications', 
      icon: MessageSquare,
      description: 'Messages and announcements'
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: Cog,
      description: 'System configuration'
    },
    { 
      name: 'Audit Logs', 
      href: '/admin/audit-logs', 
      icon: FileText,
      description: 'Activity tracking'
    },
  ]

  const mockNotifications = [
    { id: 1, title: 'New alumni registration', message: 'John Smith registered for the platform', time: '2 minutes ago', type: 'info', unread: true },
    { id: 2, title: 'Event approval needed', message: 'Annual Reunion 2024 needs approval', time: '15 minutes ago', type: 'warning', unread: true },
    { id: 3, title: 'Donation received', message: '$500 donation from Sarah Johnson', time: '1 hour ago', type: 'success', unread: false },
    { id: 4, title: 'System maintenance', message: 'Scheduled maintenance tonight at 2 AM', time: '3 hours ago', type: 'info', unread: false },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Admin Portal</h3>
          <p className="text-gray-600">Please wait while we prepare your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Access Denied</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">You need to be logged in as an admin to access this portal. Please authenticate to continue.</p>
          <a 
            href="/admin/login" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Shield className="w-5 h-5 mr-2" />
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Enhanced Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20 transform transition-all duration-500 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="relative h-20 px-6 border-b border-gray-100/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
                  Admin Portal
                </h1>
                <p className="text-sm text-gray-500 font-medium leading-tight">Management Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="mt-8 px-4 pb-6 overflow-y-auto h-[calc(100vh-5rem)]">
          <div className="space-y-8">
            {/* Main Navigation */}
            <div>
              <div className="px-3 mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center">
                  <Zap className="w-3 h-3 mr-2" />
                  Main Menu
                </h3>
              </div>
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                      item.current
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 hover:shadow-sm'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      item.current 
                        ? 'bg-white/20' 
                        : 'bg-gray-100 group-hover:bg-blue-100'
                    }`}>
                      <item.icon className={`h-5 w-5 transition-all duration-300 ${
                        item.current 
                          ? 'text-white' 
                          : 'text-gray-500 group-hover:text-blue-600'
                      }`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <span className="font-semibold">{item.name}</span>
                      <p className={`text-xs mt-0.5 ${
                        item.current ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                    {item.current && (
                      <div className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* User Management */}
            <div>
              <div className="px-3 mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center">
                  <Users className="w-3 h-3 mr-2" />
                  User Management
                </h3>
              </div>
              <div className="space-y-2">
                {userManagement.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-all duration-300">
                      <item.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <span className="font-medium">{item.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Content Management */}
            <div>
              <div className="px-3 mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center">
                  <Cog className="w-3 h-3 mr-2" />
                  Content & Settings
                </h3>
              </div>
              <div className="space-y-2">
                {contentManagement.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-900 transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-all duration-300">
                      <item.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <span className="font-medium">{item.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Enhanced Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100/50 fixed top-0 right-0 left-0 lg:left-80 z-30">
          <div className="flex items-center justify-between h-20 px-6 lg:px-8">
            {/* Left side - Menu button and search */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-all duration-200"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Enhanced Global search */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search alumni, events, donations..."
                    className="block w-96 lg:w-[28rem] pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-500 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Right side - Notifications, help, user menu */}
            <div className="flex items-center space-x-3">
              {/* Enhanced Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-3 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl relative transition-all duration-200 group"
                >
                  <Bell className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  {mockNotifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-pulse text-xs text-white flex items-center justify-center font-bold">
                      {mockNotifications.filter(n => n.unread).length}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100/50 z-50 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                        <span className="text-sm text-gray-500">
                          {mockNotifications.filter(n => n.unread).length} unread
                        </span>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                          notification.unread ? 'bg-blue-50/30' : ''
                        }`}>
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-500 font-semibold flex items-center">
                        <span>View all notifications</span>
                        <TrendingUp className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Help */}
              <button
                onClick={() => alert('Help functionality would be implemented here')}
                className="p-3 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200 group"
              >
                <HelpCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              </button>

              {/* Enhanced User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-white/50 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                    <span className="text-white text-sm font-bold">
                      {adminUser.name?.charAt(0)}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-bold text-gray-900">{adminUser.name}</p>
                    <p className="text-xs text-gray-500 font-medium">Administrator</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100/50 z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            {adminUser.name?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{adminUser.name}</p>
                          <p className="text-sm text-gray-500">{adminUser.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <a
                        href="/admin/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                      >
                        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-all duration-200">
                          <User className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
                        </div>
                        <span className="ml-3 font-medium">Your Profile</span>
                      </a>
                      <a
                        href="/admin/settings"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 group"
                      >
                        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-all duration-200">
                          <Settings className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
                        </div>
                        <span className="ml-3 font-medium">Settings</span>
                      </a>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-200 group"
                      >
                        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-red-100 transition-all duration-200">
                          <LogOut className="h-4 w-4 text-gray-500 group-hover:text-red-600" />
                        </div>
                        <span className="ml-3 font-medium">Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pt-20 overflow-auto">
          {children}
        </main>
      </div>

      {/* Click outside handlers */}
      {(notificationsOpen || userMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setNotificationsOpen(false)
            setUserMenuOpen(false)
          }}
        />
      )}
    </div>
  )
}