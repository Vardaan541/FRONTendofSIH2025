'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { getAdminUser, type AdminUser } from '@/lib/auth'
import { 
  Users, 
  UserCheck, 
  Heart, 
  Calendar, 
  AlertTriangle, 
  UserPlus,
  Plus,
  Upload,
  Send,
  Activity,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Eye,
  X,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Zap,
  Target,
  Award,
  Globe,
  MessageCircle,
  FileText,
  Settings,
  Bell,
  Search,
  Shield,
  Sparkles,
  Layers,
  PieChart,
  LineChart,
  TrendingDown
} from 'lucide-react'

// AdminUser interface is now imported from lib/auth

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('AdminDashboard: Checking for admin user data...')
    const user = getAdminUser()
    console.log('AdminDashboard: User data:', user)
    
    if (user) {
      setAdminUser(user)
    }
    setIsLoading(false)
  }, [])

  const kpiData = [
    {
      title: 'Active Alumni',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue',
      iconBg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600',
      progressBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      description: 'Total registered alumni',
      trend: [120, 150, 180, 200, 220, 250]
    },
    {
      title: 'Pending Verifications',
      value: '23',
      change: '-5%',
      changeType: 'negative',
      icon: UserCheck,
      color: 'amber',
      iconBg: 'bg-gradient-to-br from-amber-50 to-orange-50',
      iconColor: 'text-amber-600',
      progressBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
      description: 'Awaiting approval',
      trend: [45, 38, 32, 28, 25, 23]
    },
    {
      title: 'Month-to-Date Donations',
      value: '$45,230',
      change: '+18%',
      changeType: 'positive',
      icon: Heart,
      color: 'emerald',
      iconBg: 'bg-gradient-to-br from-emerald-50 to-green-50',
      iconColor: 'text-emerald-600',
      progressBg: 'bg-gradient-to-r from-emerald-500 to-green-500',
      description: 'Total contributions',
      trend: [15000, 18000, 22000, 25000, 28000, 32000]
    },
    {
      title: 'Upcoming Events',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: Calendar,
      color: 'purple',
      iconBg: 'bg-gradient-to-br from-purple-50 to-violet-50',
      iconColor: 'text-purple-600',
      progressBg: 'bg-gradient-to-r from-purple-500 to-violet-500',
      description: 'Scheduled events',
      trend: [3, 4, 5, 6, 7, 8]
    },
    {
      title: 'Open Tickets',
      value: '12',
      change: '-3',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'red',
      iconBg: 'bg-gradient-to-br from-red-50 to-rose-50',
      iconColor: 'text-red-600',
      progressBg: 'bg-gradient-to-r from-red-500 to-rose-500',
      description: 'Support requests',
      trend: [25, 22, 18, 15, 13, 12]
    },
    {
      title: 'New Signups',
      value: '156',
      change: '+24%',
      changeType: 'positive',
      icon: UserPlus,
      color: 'indigo',
      iconBg: 'bg-gradient-to-br from-indigo-50 to-blue-50',
      iconColor: 'text-indigo-600',
      progressBg: 'bg-gradient-to-r from-indigo-500 to-blue-500',
      description: 'This month',
      trend: [80, 95, 110, 125, 140, 156]
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'approval',
      title: 'Profile approved',
      description: 'Sarah Johnson\'s alumni profile was approved',
      time: '2 minutes ago',
      user: 'Sarah Johnson',
      icon: CheckCircle,
      color: 'green',
      iconBg: 'bg-gradient-to-br from-green-100 to-emerald-100',
      iconColor: 'text-green-600',
      badgeBg: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      id: 2,
      type: 'event',
      title: 'Event created',
      description: 'Annual Reunion 2024 event was created',
      time: '15 minutes ago',
      user: 'Admin User',
      icon: Calendar,
      color: 'blue',
      iconBg: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      iconColor: 'text-blue-600',
      badgeBg: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 3,
      type: 'donation',
      title: 'Donation received',
      description: '$500 donation from Michael Chen',
      time: '1 hour ago',
      user: 'Michael Chen',
      icon: Heart,
      color: 'red',
      iconBg: 'bg-gradient-to-br from-red-100 to-rose-100',
      iconColor: 'text-red-600',
      badgeBg: 'bg-red-100 text-red-800 border-red-200'
    },
    {
      id: 4,
      type: 'verification',
      title: 'Verification pending',
      description: 'John Smith\'s profile needs verification',
      time: '2 hours ago',
      user: 'John Smith',
      icon: Clock,
      color: 'yellow',
      iconBg: 'bg-gradient-to-br from-yellow-100 to-amber-100',
      iconColor: 'text-yellow-600',
      badgeBg: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    {
      id: 5,
      type: 'analytics',
      title: 'Monthly report generated',
      description: 'December 2024 analytics report ready',
      time: '3 hours ago',
      user: 'System',
      icon: TrendingUp,
      color: 'purple',
      iconBg: 'bg-gradient-to-br from-purple-100 to-violet-100',
      iconColor: 'text-purple-600',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  ]

  const pendingApprovals = [
    { id: 1, type: 'Profile', name: 'John Smith', collegeId: 'CS2020-001', submitted: '2 hours ago', priority: 'high' },
    { id: 2, type: 'Event', name: 'Tech Talk 2024', collegeId: 'EVT-2024-001', submitted: '4 hours ago', priority: 'medium' },
    { id: 3, type: 'Donation', name: 'Sarah Johnson', collegeId: 'AL2020-045', submitted: '6 hours ago', priority: 'high' },
    { id: 4, type: 'Profile', name: 'Mike Davis', collegeId: 'ME2019-023', submitted: '1 day ago', priority: 'low' }
  ]

  const quickActions = [
    { 
      title: 'Add Event', 
      icon: Plus, 
      color: 'blue', 
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:from-blue-100 hover:to-cyan-100',
      iconColor: 'text-blue-600',
      action: () => alert('Add Event functionality') 
    },
    { 
      title: 'Invite Alumni', 
      icon: UserPlus, 
      color: 'green', 
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      hoverBg: 'hover:from-green-100 hover:to-emerald-100',
      iconColor: 'text-green-600',
      action: () => alert('Invite Alumni functionality') 
    },
    { 
      title: 'Import CSV', 
      icon: Upload, 
      color: 'purple', 
      bgColor: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      hoverBg: 'hover:from-purple-100 hover:to-violet-100',
      iconColor: 'text-purple-600',
      action: () => alert('Import CSV functionality') 
    },
    { 
      title: 'Send Broadcast', 
      icon: Send, 
      color: 'orange', 
      bgColor: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      hoverBg: 'hover:from-orange-100 hover:to-amber-100',
      iconColor: 'text-orange-600',
      action: () => alert('Send Broadcast functionality') 
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Dashboard</h3>
          <p className="text-gray-600">Preparing your admin overview...</p>
        </div>
      </div>
    )
  }

  // AdminLayout already handles authentication, so we can trust that adminUser exists
  // If we reach here, the user is authenticated
  // Use a fallback user if needed for display purposes
  const displayUser = adminUser || {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@college.edu',
    role: 'admin',
    college: 'University of Technology',
    lastLogin: new Date().toISOString()
  }

  return (
    <AdminLayout>
      <div className="px-8 pb-8 space-y-8">
          {/* Enhanced Welcome Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Welcome back, {displayUser.name}!
                    </h1>
                    <p className="text-blue-100 text-lg mt-2">Here's what's happening with your alumni platform today.</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">System Online</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">23 Pending Actions</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm font-medium">Last updated: 2 min ago</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">+12% growth this month</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-medium">98.5% uptime</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl px-6 py-3 transition-all duration-200 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span className="font-medium">View Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {kpiData.map((kpi, index) => (
              <div 
                key={kpi.title} 
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${kpi.iconBg} shadow-md group-hover:scale-105 transition-all duration-300`}>
                      <kpi.icon className={`w-6 h-6 ${kpi.iconColor}`} />
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                        kpi.changeType === 'positive' 
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {kpi.changeType === 'positive' ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{kpi.value}</h3>
                    <p className="text-lg font-semibold text-gray-700 mb-1">{kpi.title}</p>
                    <p className="text-sm text-gray-500">{kpi.description}</p>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${kpi.progressBg} transition-all duration-2000 ease-out shadow-sm`}
                        style={{ width: `${Math.random() * 30 + 70}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Enhanced Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-md">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                        <p className="text-gray-600 text-sm">Latest platform updates and actions</p>
                      </div>
                    </div>
                    <button className="group flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200">
                      <span>View all</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={activity.id} className={`group flex items-start space-x-4 p-5 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100 ${index !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className={`p-3 rounded-xl ${activity.iconBg} shadow-md group-hover:scale-105 transition-transform duration-300`}>
                          <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-base font-bold text-gray-900">{activity.title}</p>
                            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">{activity.time}</span>
                          </div>
                          <p className="text-gray-600 mb-3 leading-relaxed text-sm">{activity.description}</p>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-500">by</span>
                            <span className="text-sm font-semibold text-gray-700">{activity.user}</span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${activity.badgeBg}`}>
                              {activity.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Right Sidebar */}
            <div className="space-y-6">
              {/* Pending Approvals */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 px-6 py-5 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-md">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Pending Approvals</h3>
                        <p className="text-gray-600 text-sm">Awaiting your review</p>
                      </div>
                    </div>
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                      {pendingApprovals.length}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {pendingApprovals.slice(0, 3).map((approval) => (
                      <div key={approval.id} className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-base font-bold text-gray-900">{approval.name}</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              approval.priority === 'high' ? 'bg-red-100 text-red-700' :
                              approval.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {approval.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{approval.type} • {approval.collegeId}</p>
                          <p className="text-xs text-gray-500">{approval.submitted}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button className="p-2.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all duration-200 hover:scale-110 shadow-sm" title="Approve">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button className="p-2.5 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110 shadow-sm" title="Reject">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-bold py-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-200 border border-blue-200 hover:border-blue-300">
                      View all approvals →
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Actions */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-6 py-5 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-md">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                      <p className="text-gray-600 text-sm">Common admin tasks</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={action.title}
                        onClick={action.action}
                        className={`group relative p-4 rounded-xl border-2 ${action.borderColor} bg-gradient-to-br ${action.bgColor} ${action.hoverBg} transition-all duration-300 text-center transform hover:scale-105 hover:shadow-md`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                        <div className="relative z-10">
                          <action.icon className={`w-6 h-6 ${action.iconColor} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                          <p className="text-sm font-bold text-gray-900">{action.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced System Status */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 px-6 py-5 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-md">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">System Status</h3>
                      <p className="text-gray-600 text-sm">All systems operational</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { name: 'Database', status: 'Healthy', color: 'emerald', icon: '🟢', statusBg: 'bg-emerald-100 text-emerald-600', uptime: '99.9%' },
                      { name: 'API Services', status: 'Online', color: 'emerald', icon: '🟢', statusBg: 'bg-emerald-100 text-emerald-600', uptime: '99.8%' },
                      { name: 'Email Service', status: 'Active', color: 'emerald', icon: '🟢', statusBg: 'bg-emerald-100 text-emerald-600', uptime: '99.7%' },
                      { name: 'Backup', status: 'In Progress', color: 'amber', icon: '🟡', statusBg: 'bg-amber-100 text-amber-600', uptime: 'Running' }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{service.icon}</span>
                          <div>
                            <span className="text-sm font-bold text-gray-700">{service.name}</span>
                            <p className="text-xs text-gray-500">{service.uptime}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${service.statusBg}`}>
                          {service.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="font-medium">Last health check</span>
                      <span className="font-bold">2 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Additional Statistics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Platform Growth Chart */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 px-6 py-5 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-md">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Platform Growth</h3>
                    <p className="text-gray-600 text-sm">Performance metrics</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-semibold text-gray-700">Monthly Active Users</span>
                      <span className="text-2xl font-bold text-gray-900">2,847</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-2000 ease-out shadow-sm" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-semibold text-gray-700">Engagement Rate</span>
                      <span className="text-2xl font-bold text-gray-900">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-2000 ease-out shadow-sm" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-semibold text-gray-700">Content Creation</span>
                      <span className="text-2xl font-bold text-gray-900">156</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-2000 ease-out shadow-sm" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Features */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 via-teal-50 to-emerald-50 px-6 py-5 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-md">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Top Features</h3>
                    <p className="text-gray-600 text-sm">Most used platform features</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  {[
                    { name: 'Mentoring Sessions', usage: '89%', count: '234', color: 'blue', progressBg: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
                    { name: 'Alumni Networking', usage: '76%', count: '1,892', color: 'emerald', progressBg: 'bg-gradient-to-r from-emerald-500 to-green-500' },
                    { name: 'Event Participation', usage: '68%', count: '156', color: 'purple', progressBg: 'bg-gradient-to-r from-purple-500 to-violet-500' },
                    { name: 'Job Board', usage: '54%', count: '89', color: 'orange', progressBg: 'bg-gradient-to-r from-orange-500 to-amber-500' }
                  ].map((feature, index) => (
                    <div key={index} className="group p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base font-bold text-gray-700">{feature.name}</span>
                        <span className="text-xl font-bold text-gray-900">{feature.usage}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-2">
                        <div 
                          className={`h-2 rounded-full ${feature.progressBg} transition-all duration-2000 ease-out shadow-sm`}
                          style={{ width: feature.usage }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{feature.count} users</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>
    </AdminLayout>
  )
}