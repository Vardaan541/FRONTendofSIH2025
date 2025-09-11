'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'
import { 
  User, 
  Users, 
  Brain, 
  Home, 
  Trophy, 
  LogOut,
  Menu,
  X,
  Plus
} from 'lucide-react'

interface NavigationProps {
  userRole: 'student' | 'alumni' | 'admin'
}

export default function Navigation({ userRole }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser } = useStore()

  const handleLogout = () => {
    setUser(null)
    router.push('/')
  }

  const studentNavItems = [
    { name: 'Home', href: '/student', icon: Home },
    { name: 'Profile', href: '/student/profile', icon: User },
    { name: 'My Alumni', href: '/student/alumni', icon: Users },
    { name: 'Career AI', href: '/student/career-ai', icon: Brain },
  ]

  const alumniNavItems = [
    { name: 'Home', href: '/alumni', icon: Home },
    { name: 'Profile', href: '/alumni/profile', icon: User },
    { name: 'My Students', href: '/alumni/students', icon: Users },
    { name: 'Create Post', href: '/alumni/create-post', icon: Plus },
  ]

  const navItems = userRole === 'student' ? studentNavItems : alumniNavItems

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                Alumni Platform
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <button
                      key={item.name}
                      onClick={() => router.push(item.href)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                    </button>
                  )
                })}
                <button
                  onClick={() => router.push(`/${userRole}/leaderboard`)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4" />
                    <span>Leaderboard</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500 capitalize">{userRole}</p>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                </button>
              )
            })}
            <button
              onClick={() => {
                router.push(`/${userRole}/leaderboard`)
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Leaderboard</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
