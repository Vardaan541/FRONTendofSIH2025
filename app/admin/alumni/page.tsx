'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  CheckCircle, 
  X, 
  Clock,
  MapPin,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  UserCheck,
  AlertTriangle,
  Shield,
  Sparkles,
  TrendingUp,
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
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  TrendingDown,
  Layers,
  Plus,
  Upload,
  Send,
  RefreshCw,
  Heart,
  DollarSign,
  Edit,
  Trash2
} from 'lucide-react'

interface AlumniProfile {
  id: string
  name: string
  email: string
  collegeId: string
  graduationYear: number
  department: string
  degree: string
  currentJob: string
  company: string
  location: string
  status: 'verified' | 'pending' | 'rejected'
  lastActive: string
  joinedDate: string
  phone?: string
  linkedin?: string
  bio?: string
}

export default function AlumniProfilesPage() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterYear, setFilterYear] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState<string | null>(null)

  useEffect(() => {
    // Mock alumni data
    setAlumni([
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        collegeId: 'CS2020-001',
        graduationYear: 2020,
        department: 'Computer Science',
        degree: 'Bachelor of Technology',
        currentJob: 'Software Engineer',
        company: 'Google',
        location: 'San Francisco, CA',
        status: 'verified',
        lastActive: '2024-01-15T10:30:00Z',
        joinedDate: '2024-01-01T00:00:00Z',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/sarahjohnson',
        bio: 'Passionate software engineer with 4 years of experience in full-stack development.'
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        collegeId: 'ME2019-023',
        graduationYear: 2019,
        department: 'Mechanical Engineering',
        degree: 'Bachelor of Engineering',
        currentJob: 'Product Manager',
        company: 'Tesla',
        location: 'Austin, TX',
        status: 'verified',
        lastActive: '2024-01-14T15:45:00Z',
        joinedDate: '2024-01-05T00:00:00Z',
        phone: '+1 (555) 234-5678',
        linkedin: 'linkedin.com/in/michaelchen',
        bio: 'Product manager with expertise in automotive technology and team leadership.'
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@email.com',
        collegeId: 'BUS2021-045',
        graduationYear: 2021,
        department: 'Business Administration',
        degree: 'Master of Business Administration',
        currentJob: 'Marketing Director',
        company: 'Microsoft',
        location: 'Seattle, WA',
        status: 'pending',
        lastActive: '2024-01-13T09:20:00Z',
        joinedDate: '2024-01-10T00:00:00Z',
        phone: '+1 (555) 345-6789',
        linkedin: 'linkedin.com/in/emilyrodriguez',
        bio: 'Marketing professional with a focus on digital transformation and brand strategy.'
      },
      {
        id: '4',
        name: 'David Kim',
        email: 'david.kim@email.com',
        collegeId: 'MED2018-012',
        graduationYear: 2018,
        department: 'Medicine',
        degree: 'Doctor of Medicine',
        currentJob: 'Resident Physician',
        company: 'Johns Hopkins Hospital',
        location: 'Baltimore, MD',
        status: 'verified',
        lastActive: '2024-01-12T14:15:00Z',
        joinedDate: '2024-01-08T00:00:00Z',
        phone: '+1 (555) 456-7890',
        linkedin: 'linkedin.com/in/davidkim',
        bio: 'Medical professional specializing in internal medicine and patient care.'
      },
      {
        id: '5',
        name: 'Lisa Wang',
        email: 'lisa.wang@email.com',
        collegeId: 'ART2022-067',
        graduationYear: 2022,
        department: 'Arts & Sciences',
        degree: 'Bachelor of Arts',
        currentJob: 'UX Designer',
        company: 'Apple',
        location: 'Cupertino, CA',
        status: 'rejected',
        lastActive: '2024-01-11T11:30:00Z',
        joinedDate: '2024-01-12T00:00:00Z',
        phone: '+1 (555) 567-8901',
        linkedin: 'linkedin.com/in/lisawang',
        bio: 'Creative UX designer with a passion for user-centered design and innovation.'
      }
    ])
  }, [])

  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.collegeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || alumnus.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || alumnus.department === filterDepartment
    const matchesYear = filterYear === 'all' || alumnus.graduationYear.toString() === filterYear
    return matchesSearch && matchesStatus && matchesDepartment && matchesYear
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle
      case 'pending': return Clock
      case 'rejected': return X
      default: return Clock
    }
  }

  const handleViewProfile = (alumnus: AlumniProfile) => {
    setSelectedAlumni(alumnus)
    setShowProfileModal(true)
  }

  const handleApproveProfile = (alumnusId: string) => {
    setAlumni(alumni.map(a => 
      a.id === alumnusId ? { ...a, status: 'verified' as const } : a
    ))
    alert('Profile approved successfully!')
  }

  const handleRejectProfile = (alumnusId: string) => {
    setAlumni(alumni.map(a => 
      a.id === alumnusId ? { ...a, status: 'rejected' as const } : a
    ))
    alert('Profile rejected.')
  }

  const departments = Array.from(new Set(alumni.map(a => a.department)))
  const graduationYears = Array.from(new Set(alumni.map(a => a.graduationYear))).sort((a, b) => b - a)

  const totalAlumni = alumni.length
  const verifiedAlumni = alumni.filter(a => a.status === 'verified').length
  const pendingAlumni = alumni.filter(a => a.status === 'pending').length
  const rejectedAlumni = alumni.filter(a => a.status === 'rejected').length

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
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Alumni Profiles
                    </h1>
                    <p className="text-blue-100 text-lg mt-2">Manage and verify alumni profiles and information</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{verifiedAlumni} Verified</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{pendingAlumni} Pending</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm font-medium">Last updated: 2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+12% growth this month</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl px-6 py-3 transition-all duration-200 flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span className="font-medium">Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Alumni</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalAlumni}</p>
                  <p className="text-xs text-gray-500 mt-1">All registered alumni</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Verified</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{verifiedAlumni}</p>
                  <p className="text-xs text-gray-500 mt-1">Approved profiles</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{pendingAlumni}</p>
                  <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Rejected</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{rejectedAlumni}</p>
                  <p className="text-xs text-gray-500 mt-1">Declined profiles</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search alumni..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Status</option>
                      <option value="verified">Verified</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                    <select
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Years</option>
                      {graduationYears.map(year => (
                        <option key={year} value={year.toString()}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Alumni Table */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Alumni
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Education
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Current Position
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAlumni.map((alumnus) => {
                    const StatusIcon = getStatusIcon(alumnus.status)
                    return (
                      <tr key={alumnus.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                              <span className="text-white text-sm font-bold">
                                {alumnus.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-gray-900">{alumnus.name}</div>
                              <div className="text-sm text-gray-500">{alumnus.email}</div>
                              <div className="text-xs text-gray-400">{alumnus.collegeId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">{alumnus.degree}</div>
                          <div className="text-sm text-gray-500">{alumnus.department}</div>
                          <div className="text-xs text-gray-400">{alumnus.graduationYear}</div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="text-sm text-gray-900 font-medium">{alumnus.currentJob}</div>
                          <div className="text-sm text-gray-500">{alumnus.company}</div>
                          <div className="text-xs text-gray-400 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {alumnus.location}
                          </div>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(alumnus.status)}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {alumnus.status}
                          </span>
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                          {new Date(alumnus.lastActive).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewProfile(alumnus)}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                              title="View Profile"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {alumnus.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApproveProfile(alumnus.id)}
                                  className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                                  title="Approve"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectProfile(alumnus.id)}
                                  className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <div className="relative">
                              <button
                                onClick={() => setShowUserMenu(showUserMenu === alumnus.id ? null : alumnus.id)}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              {showUserMenu === alumnus.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                                  <div className="py-1">
                                    <button
                                      onClick={() => {
                                        alert(`Send email to ${alumnus.name}`)
                                        setShowUserMenu(null)
                                      }}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <Mail className="mr-3 h-4 w-4" />
                                      Send Email
                                    </button>
                                    <button
                                      onClick={() => {
                                        alert(`Request more info from ${alumnus.name}`)
                                        setShowUserMenu(null)
                                      }}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <AlertTriangle className="mr-3 h-4 w-4" />
                                      Request More Info
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enhanced Profile Detail Modal */}
          {showProfileModal && selectedAlumni && (
            <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Alumni Profile Details</h3>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">College ID</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.collegeId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.linkedin || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Educational Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Educational Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.degree}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.department}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.graduationYear}</p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Job</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.currentJob}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                        <p className="text-gray-900 font-medium">{selectedAlumni.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  {selectedAlumni.bio && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Bio</h4>
                      <p className="text-gray-900 leading-relaxed">{selectedAlumni.bio}</p>
                    </div>
                  )}

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAlumni.status)}`}>
                        {(() => {
                          const StatusIcon = getStatusIcon(selectedAlumni.status)
                          return <StatusIcon className="w-4 h-4 mr-1" />
                        })()}
                        {selectedAlumni.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      {selectedAlumni.status === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              handleApproveProfile(selectedAlumni.id)
                              setShowProfileModal(false)
                            }}
                            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              handleRejectProfile(selectedAlumni.id)
                              setShowProfileModal(false)
                            }}
                            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setShowProfileModal(false)}
                        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </AdminLayout>
  )
}