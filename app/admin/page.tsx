'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Shield, Users, Settings, BarChart3, AlertTriangle, CheckCircle, LogOut, Crown, Activity, Database, Eye, Lock } from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useStore()
  const router = useRouter()

  useEffect(() => {
    console.log('Admin dashboard - user:', user) // Debug log
    if (!user || user.role !== 'admin') {
      console.log('Redirecting to home - user not found or not admin') // Debug log
      router.push('/')
      return
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Admin Header */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Alumni Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-purple-600 font-medium">Platform Administrator</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.name?.charAt(0)}
                </span>
              </div>
              <button
                onClick={() => {
                  // Reset user and go back to home
                  window.location.href = '/'
                }}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}!</h1>
                <p className="text-xl text-purple-100">Platform Administrator Dashboard</p>
              </div>
            </div>
            <p className="text-lg text-purple-100 max-w-2xl">
              Monitor and manage the alumni platform, oversee user interactions, and ensure optimal performance across all system components.
            </p>
          </div>
        </div>

        {/* Enhanced Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-green-600 font-medium">+12% this month</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Users</h3>
            <p className="text-gray-600 text-sm">Students, Alumni & Staff</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">45</p>
                <p className="text-sm text-green-600 font-medium">Active now</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Sessions</h3>
            <p className="text-gray-600 text-sm">Mentoring & Networking</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-yellow-600 font-medium">Needs attention</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Pending Requests</h3>
            <p className="text-gray-600 text-sm">Awaiting approval</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-green-600 font-medium">Excellent</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Platform Health</h3>
            <p className="text-gray-600 text-sm">System performance</p>
          </div>
        </div>

        {/* Enhanced Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Platform Management</h3>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200 hover:border-blue-300 group">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">User Management</h4>
                    <p className="text-sm text-gray-600">Manage students, alumni, and staff accounts</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200 border border-green-200 hover:border-green-300 group">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Content Moderation</h4>
                    <p className="text-sm text-gray-600">Review and moderate posts and interactions</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200 hover:border-purple-300 group">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">System Settings</h4>
                    <p className="text-sm text-gray-600">Configure platform settings and preferences</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all duration-200 border border-orange-200 hover:border-orange-300 group">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Analytics & Reports</h4>
                    <p className="text-sm text-gray-600">View detailed analytics and generate reports</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Security & Monitoring</h3>
            </div>
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-200 border border-red-200 hover:border-red-300 group">
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Security Logs</h4>
                    <p className="text-sm text-gray-600">Monitor security events and access logs</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl hover:from-indigo-100 hover:to-indigo-200 transition-all duration-200 border border-indigo-200 hover:border-indigo-300 group">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">User Activity</h4>
                    <p className="text-sm text-gray-600">Track user behavior and platform usage</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all duration-200 border border-emerald-200 hover:border-emerald-300 group">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">System Health</h4>
                    <p className="text-sm text-gray-600">Monitor system performance and uptime</p>
                  </div>
                </div>
              </button>
              <button className="w-full text-left p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl hover:from-cyan-100 hover:to-cyan-200 transition-all duration-200 border border-cyan-200 hover:border-cyan-300 group">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-cyan-600 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Backup & Recovery</h4>
                    <p className="text-sm text-gray-600">Manage data backups and recovery procedures</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">New user registration</p>
                  <p className="text-sm text-gray-600">John Student joined the platform</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-green-600">2 minutes ago</span>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Session request approved</p>
                  <p className="text-sm text-gray-600">Sarah Johnson accepted a mentoring session</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-blue-600">15 minutes ago</span>
                <p className="text-xs text-gray-500">Alumni</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">New post created</p>
                  <p className="text-sm text-gray-600">Michael Chen shared career insights</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-purple-600">1 hour ago</span>
                <p className="text-xs text-gray-500">Content</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">System maintenance scheduled</p>
                  <p className="text-sm text-gray-600">Database optimization planned for tonight</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-orange-600">3 hours ago</span>
                <p className="text-xs text-gray-500">System</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Backup completed successfully</p>
                  <p className="text-sm text-gray-600">Daily backup of user data completed</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-cyan-600">6 hours ago</span>
                <p className="text-xs text-gray-500">Backup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

