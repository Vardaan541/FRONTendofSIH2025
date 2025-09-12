'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Heart, 
  DollarSign,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  RefreshCw,
  Shield,
  Sparkles,
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
  CheckCircle,
  Clock,
  AlertTriangle,
  UserCheck,
  UserPlus,
  Plus,
  Upload,
  Send,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  LineChart
} from 'lucide-react'

interface ChartData {
  month: string
  alumni: number
  students: number
  donations: number
  events: number
}

interface DepartmentData {
  department: string
  alumni: number
  percentage: number
  color: string
}

interface EngagementData {
  platform: string
  users: number
  percentage: number
  color: string
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [selectedMetric, setSelectedMetric] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const chartData: ChartData[] = [
    { month: 'Jul', alumni: 120, students: 80, donations: 15000, events: 3 },
    { month: 'Aug', alumni: 150, students: 95, donations: 18000, events: 4 },
    { month: 'Sep', alumni: 180, students: 110, donations: 22000, events: 5 },
    { month: 'Oct', alumni: 200, students: 125, donations: 25000, events: 6 },
    { month: 'Nov', alumni: 220, students: 140, donations: 28000, events: 7 },
    { month: 'Dec', alumni: 250, students: 160, donations: 32000, events: 8 }
  ]

  const departmentData: DepartmentData[] = [
    { department: 'Computer Science', alumni: 450, percentage: 28, color: 'bg-blue-500' },
    { department: 'Engineering', alumni: 380, percentage: 24, color: 'bg-green-500' },
    { department: 'Business', alumni: 320, percentage: 20, color: 'bg-purple-500' },
    { department: 'Medicine', alumni: 250, percentage: 16, color: 'bg-red-500' },
    { department: 'Arts & Sciences', alumni: 200, percentage: 12, color: 'bg-yellow-500' }
  ]

  const engagementData: EngagementData[] = [
    { platform: 'Website', users: 1200, percentage: 45, color: 'bg-blue-500' },
    { platform: 'Mobile App', users: 800, percentage: 30, color: 'bg-green-500' },
    { platform: 'Email', users: 500, percentage: 19, color: 'bg-purple-500' },
    { platform: 'Social Media', users: 180, percentage: 6, color: 'bg-orange-500' }
  ]

  const keyMetrics = [
    {
      title: 'Total Alumni',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue',
      iconBg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Active Students',
      value: '1,234',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'green',
      iconBg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Donations',
      value: '$156,230',
      change: '+18%',
      changeType: 'positive',
      icon: Heart,
      color: 'red',
      iconBg: 'bg-gradient-to-br from-red-50 to-rose-50',
      iconColor: 'text-red-600'
    },
    {
      title: 'Events This Year',
      value: '24',
      change: '+4',
      changeType: 'positive',
      icon: Calendar,
      color: 'purple',
      iconBg: 'bg-gradient-to-br from-purple-50 to-violet-50',
      iconColor: 'text-purple-600'
    }
  ]

  const generateReport = () => {
    setIsLoading(true)
    setTimeout(() => {
      alert('Report generated successfully! Download would start automatically.')
      setIsLoading(false)
    }, 2000)
  }

  const maxValue = Math.max(...chartData.map(d => Math.max(d.alumni, d.students, d.donations / 1000, d.events * 10)))

  return (
    <AdminLayout>
      <div className="px-8 pb-8 space-y-8">
          {/* Enhanced Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Analytics & Reports
                    </h1>
                    <p className="text-blue-100 text-lg mt-2">Comprehensive insights into alumni engagement and platform performance</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                  <button
                    onClick={generateReport}
                    disabled={isLoading}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl px-6 py-3 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                    <span className="font-medium">{isLoading ? 'Generating...' : 'Generate Report'}</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">Last updated: 5 min ago</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+15% growth this month</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">98.5% data accuracy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Filters */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="1month">Last Month</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="6months">Last 6 Months</option>
                    <option value="1year">Last Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="all">All Metrics</option>
                    <option value="alumni">Alumni Growth</option>
                    <option value="donations">Donations</option>
                    <option value="events">Events</option>
                    <option value="engagement">Engagement</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
                  <Filter className="w-4 h-4" />
                  <span>Advanced Filters</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
                  <Eye className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <div key={metric.title} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.iconBg}`}>
                    <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                  </div>
                  <span className={`text-sm font-medium flex items-center ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.changeType === 'positive' ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</h3>
                <p className="text-sm text-gray-600 font-medium">{metric.title}</p>
              </div>
            ))}
          </div>

          {/* Enhanced Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Alumni Growth Chart */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Alumni Growth Trend</h3>
                    <p className="text-gray-600 text-sm">Monthly growth comparison</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Alumni</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Students</span>
                  </div>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="w-full flex flex-col items-center space-y-1">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                        style={{ height: `${(data.alumni / maxValue) * 200}px` }}
                      ></div>
                      <div 
                        className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                        style={{ height: `${(data.students / maxValue) * 200}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Distribution */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <PieChart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Alumni by Department</h3>
                    <p className="text-gray-600 text-sm">Distribution across departments</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 ${dept.color} rounded-full`}></div>
                      <span className="text-sm font-semibold text-gray-900">{dept.department}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{dept.alumni}</span>
                      <span className="text-sm font-bold text-gray-900">{dept.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Engagement and Donations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Platform Engagement */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Platform Engagement</h3>
                    <p className="text-gray-600 text-sm">User activity across platforms</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {engagementData.map((platform, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">{platform.platform}</span>
                      <span className="text-sm text-gray-600">{platform.users} users</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${platform.color}`}
                        style={{ width: `${platform.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donations Trend */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Donations Trend</h3>
                    <p className="text-gray-600 text-sm">Monthly donation amounts</p>
                  </div>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t"
                      style={{ height: `${(data.donations / 35000) * 200}px` }}
                    ></div>
                    <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                    <span className="text-xs text-gray-400">${(data.donations / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Detailed Reports */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Detailed Reports</h3>
                  <p className="text-gray-600 text-sm">Comprehensive analytics reports</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm transition-all duration-200">
                  <Download className="w-4 h-4 mr-2 inline" />
                  Export All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">User Analytics</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Detailed breakdown of user demographics, engagement patterns, and growth metrics.</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center">
                  <span>View Report</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Donation Analysis</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Comprehensive analysis of donation patterns, donor behavior, and fundraising effectiveness.</p>
                <button className="text-green-600 hover:text-green-700 text-sm font-semibold flex items-center">
                  <span>View Report</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-violet-50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Event Performance</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Analysis of event attendance, engagement rates, and return on investment for events.</p>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center">
                  <span>View Report</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
      </div>
    </AdminLayout>
  )
}