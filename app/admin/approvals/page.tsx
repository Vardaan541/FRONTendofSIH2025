'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { 
  CheckCircle, 
  X, 
  Clock, 
  User, 
  Calendar, 
  Heart, 
  AlertTriangle,
  Eye,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Users,
  FileText,
  DollarSign,
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
  Settings,
  Bell,
  BarChart3,
  PieChart,
  LineChart,
  TrendingDown,
  Activity,
  Layers,
  Plus,
  Download,
  RefreshCw
} from 'lucide-react'

interface ApprovalItem {
  id: string
  type: 'profile' | 'event' | 'donation' | 'job' | 'content'
  title: string
  description: string
  submittedBy: string
  submittedDate: string
  status: 'pending' | 'approved' | 'rejected'
  priority: 'low' | 'medium' | 'high'
  collegeId: string
  details?: any
}

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('pending')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedApproval, setSelectedApproval] = useState<ApprovalItem | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEventApprovalModal, setShowEventApprovalModal] = useState(false)
  const [eventApprovalData, setEventApprovalData] = useState({
    capacity: 50,
    price: 0,
    status: 'upcoming',
    notes: ''
  })

  useEffect(() => {
    // Mock approvals data
    setApprovals([
      {
        id: '1',
        type: 'profile',
        title: 'John Smith - Alumni Profile',
        description: 'New alumni profile submission with employment verification',
        submittedBy: 'John Smith',
        submittedDate: '2024-01-15T10:30:00Z',
        status: 'pending',
        priority: 'medium',
        collegeId: 'CS2020-001',
        details: {
          name: 'John Smith',
          email: 'john.smith@email.com',
          graduationYear: 2020,
          department: 'Computer Science',
          currentJob: 'Software Engineer',
          company: 'Microsoft'
        }
      },
      {
        id: '2',
        type: 'event',
        title: 'Tech Talk 2024 - Annual Conference',
        description: 'Annual technology conference for alumni and students',
        submittedBy: 'Sarah Johnson',
        submittedDate: '2024-01-14T15:45:00Z',
        status: 'pending',
        priority: 'high',
        collegeId: 'EVT-2024-001',
        details: {
          eventName: 'Tech Talk 2024',
          date: '2024-03-15',
          time: '18:00',
          venue: 'University Auditorium',
          expectedAttendees: 200,
          budget: 15000,
          type: 'conference',
          contactEmail: 'sarah.johnson@email.com',
          contactPhone: '+1 (555) 123-4567',
          organizer: 'Sarah Johnson'
        }
      },
      {
        id: '6',
        type: 'event',
        title: 'Networking Mixer - Alumni Meetup',
        description: 'Casual networking event for alumni to connect and share experiences',
        submittedBy: 'Michael Chen',
        submittedDate: '2024-01-16T10:30:00Z',
        status: 'pending',
        priority: 'medium',
        collegeId: 'EVT-REQ-20240116',
        details: {
          eventName: 'Networking Mixer - Alumni Meetup',
          date: '2024-04-20',
          time: '19:00',
          venue: 'Downtown Conference Center',
          expectedAttendees: 50,
          budget: 2500,
          type: 'networking',
          contactEmail: 'michael.chen@email.com',
          contactPhone: '+1 (555) 234-5678',
          organizer: 'Michael Chen'
        }
      },
      {
        id: '3',
        type: 'donation',
        title: 'Scholarship Fund Donation',
        description: 'Donation to the Computer Science Scholarship Fund',
        submittedBy: 'Michael Chen',
        submittedDate: '2024-01-13T09:20:00Z',
        status: 'pending',
        priority: 'high',
        collegeId: 'DON-2024-001',
        details: {
          amount: 5000,
          fund: 'Computer Science Scholarship Fund',
          donorName: 'Michael Chen',
          donorEmail: 'michael.chen@email.com',
          isAnonymous: false
        }
      },
      {
        id: '4',
        type: 'job',
        title: 'Software Engineer Position at Google',
        description: 'Job posting for software engineer position',
        submittedBy: 'Emily Rodriguez',
        submittedDate: '2024-01-12T14:15:00Z',
        status: 'pending',
        priority: 'medium',
        collegeId: 'JOB-2024-001',
        details: {
          position: 'Software Engineer',
          company: 'Google',
          location: 'Mountain View, CA',
          salary: '$120,000 - $180,000',
          description: 'Full-stack development role with focus on web applications'
        }
      },
      {
        id: '5',
        type: 'content',
        title: 'Alumni Success Story - Startup Journey',
        description: 'Article about alumni startup success story',
        submittedBy: 'David Kim',
        submittedDate: '2024-01-11T11:30:00Z',
        status: 'pending',
        priority: 'low',
        collegeId: 'CNT-2024-001',
        details: {
          title: 'From Student to CEO: A Startup Journey',
          author: 'David Kim',
          category: 'Success Story',
          wordCount: 1200,
          hasImages: true
        }
      }
    ])
  }, [])

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || approval.type === filterType
    const matchesStatus = filterStatus === 'all' || approval.status === filterStatus
    const matchesPriority = filterPriority === 'all' || approval.priority === filterPriority
    return matchesSearch && matchesType && matchesStatus && matchesPriority
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'profile': return User
      case 'event': return Calendar
      case 'donation': return Heart
      case 'job': return Users
      case 'content': return FileText
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'profile': return 'bg-blue-100 text-blue-800'
      case 'event': return 'bg-green-100 text-green-800'
      case 'donation': return 'bg-red-100 text-red-800'
      case 'job': return 'bg-purple-100 text-purple-800'
      case 'content': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleApprove = (approvalId: string) => {
    const approval = approvals.find(a => a.id === approvalId)
    if (approval) {
      setApprovals(approvals.map(a => 
        a.id === approvalId ? { ...a, status: 'approved' as const } : a
      ))
      
      if (approval.type === 'event') {
        // Create the approved event in the events system
        const eventData = {
          id: `EVT-${Date.now()}`,
          title: approval.details?.eventName || 'Approved Event',
          description: approval.description,
          date: approval.details?.date || '',
          time: approval.details?.time || '',
          venue: approval.details?.venue || '',
          capacity: approval.details?.expectedAttendees || 50,
          registered: 0,
          status: 'upcoming' as const,
          type: approval.details?.type || 'networking',
          price: 0,
          organizer: approval.details?.organizer || approval.submittedBy,
          collegeId: approval.collegeId
        }
        
        // In a real app, this would be sent to the backend to create the event
        console.log('Creating approved event:', eventData)
        
        alert(`Event "${approval.details?.eventName}" has been approved and will be added to the events calendar!`)
      } else {
        alert('Item approved successfully!')
      }
    }
  }

  const handleReject = (approvalId: string) => {
    const approval = approvals.find(a => a.id === approvalId)
    if (approval) {
      setApprovals(approvals.map(a => 
        a.id === approvalId ? { ...a, status: 'rejected' as const } : a
      ))
      
      if (approval.type === 'event') {
        alert(`Event "${approval.details?.eventName}" has been rejected.`)
      } else {
        alert('Item rejected.')
      }
    }
  }

  const handleViewDetails = (approval: ApprovalItem) => {
    setSelectedApproval(approval)
    setShowDetailModal(true)
  }

  const handleEventApproval = (approval: ApprovalItem) => {
    setSelectedApproval(approval)
    setEventApprovalData({
      capacity: approval.details?.expectedAttendees || 50,
      price: 0,
      status: 'upcoming',
      notes: ''
    })
    setShowEventApprovalModal(true)
  }

  const handleEventApprovalSubmit = () => {
    if (!selectedApproval) return

    // Create the approved event with admin modifications
    const eventData = {
      id: `EVT-${Date.now()}`,
      title: selectedApproval.details?.eventName || 'Approved Event',
      description: selectedApproval.description,
      date: selectedApproval.details?.date || '',
      time: selectedApproval.details?.time || '',
      venue: selectedApproval.details?.venue || '',
      capacity: eventApprovalData.capacity,
      registered: 0,
      status: eventApprovalData.status as 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
      type: selectedApproval.details?.type || 'networking',
      price: eventApprovalData.price,
      organizer: selectedApproval.details?.organizer || selectedApproval.submittedBy,
      collegeId: selectedApproval.collegeId,
      adminNotes: eventApprovalData.notes
    }

    // Update approval status
    setApprovals(approvals.map(a => 
      a.id === selectedApproval.id ? { ...a, status: 'approved' as const } : a
    ))

    // In a real app, this would be sent to the backend
    console.log('Creating approved event with admin modifications:', eventData)

    alert(`Event "${selectedApproval.details?.eventName}" has been approved and will be added to the events calendar!`)
    
    setShowEventApprovalModal(false)
    setSelectedApproval(null)
  }

  const pendingCount = approvals.filter(a => a.status === 'pending').length
  const highPriorityCount = approvals.filter(a => a.status === 'pending' && a.priority === 'high').length
  const approvedToday = approvals.filter(a => a.status === 'approved').length

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
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Approvals Queue
                    </h1>
                    <p className="text-blue-100 text-lg mt-2">Review and approve pending submissions</p>
                  </div>
                </div>
                <div className="hidden lg:flex items-center space-x-4">
                  {highPriorityCount > 0 && (
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">{highPriorityCount} High Priority</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{pendingCount} Pending</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">Last updated: 2 min ago</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Avg. response time: 2.3h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Pending</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{pendingCount}</p>
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
                  <p className="text-sm text-gray-600 font-medium">Approved Today</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{approvedToday}</p>
                  <p className="text-xs text-gray-500 mt-1">Completed reviews</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">High Priority</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{highPriorityCount}</p>
                  <p className="text-xs text-gray-500 mt-1">Urgent items</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Avg. Response Time</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">2.3h</p>
                  <p className="text-xs text-gray-500 mt-1">Processing time</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <Clock className="w-8 h-8 text-blue-600" />
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
                    placeholder="Search approvals..."
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Types</option>
                      <option value="profile">Profile</option>
                      <option value="event">Event</option>
                      <option value="donation">Donation</option>
                      <option value="job">Job</option>
                      <option value="content">Content</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="all">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Approvals List */}
          <div className="space-y-4">
            {filteredApprovals.map((approval) => {
              const TypeIcon = getTypeIcon(approval.type)
              return (
                <div key={approval.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6 flex-1">
                      <div className={`p-4 rounded-xl ${getTypeColor(approval.type)}`}>
                        <TypeIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-bold text-gray-900">{approval.title}</h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(approval.type)}`}>
                            {approval.type}
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                            {approval.priority} priority
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}>
                            {approval.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">{approval.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>Submitted by: {approval.submittedBy}</span>
                          </span>
                          <span>•</span>
                          <span>{new Date(approval.submittedDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>ID: {approval.collegeId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-6">
                      <button
                        onClick={() => handleViewDetails(approval)}
                        className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {approval.status === 'pending' && (
                        <>
                          {approval.type === 'event' ? (
                            <button
                              onClick={() => handleEventApproval(approval)}
                              className="p-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200"
                              title="Review & Approve Event"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApprove(approval.id)}
                              className="p-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200"
                              title="Approve"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleReject(approval.id)}
                            className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                            title="Reject"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Enhanced Detail Modal */}
          {showDetailModal && selectedApproval && (
            <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Approval Details</h3>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Submission Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <p className="text-gray-900 font-medium">{selectedApproval.title}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedApproval.type)}`}>
                          {selectedApproval.type}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Submitted By</label>
                        <p className="text-gray-900 font-medium">{selectedApproval.submittedBy}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Submitted Date</label>
                        <p className="text-gray-900 font-medium">{new Date(selectedApproval.submittedDate).toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedApproval.priority)}`}>
                          {selectedApproval.priority}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedApproval.status)}`}>
                          {selectedApproval.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <p className="text-gray-900 leading-relaxed">{selectedApproval.description}</p>
                  </div>

                  {selectedApproval.details && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Details</h4>
                      <div className="bg-gray-50 rounded-xl p-6">
                        {selectedApproval.type === 'event' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3">Event Information</h5>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-600">Event Name</label>
                                  <p className="text-gray-900">{selectedApproval.details.eventName}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-600">Date & Time</label>
                                  <p className="text-gray-900">{selectedApproval.details.date} at {selectedApproval.details.time}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-600">Venue</label>
                                  <p className="text-gray-900">{selectedApproval.details.venue}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-600">Event Type</label>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {selectedApproval.details.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3">Event Details</h5>
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-sm font-medium text-gray-600">Expected Attendees</label>
                                  <p className="text-gray-900">{selectedApproval.details.expectedAttendees}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-600">Budget</label>
                                  <p className="text-gray-900">${selectedApproval.details.budget?.toLocaleString() || 'Not specified'}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-600">Organizer</label>
                                  <p className="text-gray-900">{selectedApproval.details.organizer}</p>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-600">Contact Email</label>
                                  <p className="text-gray-900">{selectedApproval.details.contactEmail}</p>
                                </div>
                                {selectedApproval.details.contactPhone && (
                                  <div>
                                    <label className="block text-sm font-medium text-gray-600">Contact Phone</label>
                                    <p className="text-gray-900">{selectedApproval.details.contactPhone}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                            {JSON.stringify(selectedApproval.details, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      College ID: {selectedApproval.collegeId}
                    </div>
                    <div className="flex items-center space-x-4">
                      {selectedApproval.status === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              handleApprove(selectedApproval.id)
                              setShowDetailModal(false)
                            }}
                            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              handleReject(selectedApproval.id)
                              setShowDetailModal(false)
                            }}
                            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setShowDetailModal(false)}
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

          {/* Event Approval Modal */}
          {showEventApprovalModal && selectedApproval && (
            <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
              <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Review & Approve Event</h3>
                  <button
                    onClick={() => setShowEventApprovalModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Event Information Review */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h4>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Event Details</h5>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-600">Event Name</label>
                              <p className="text-gray-900">{selectedApproval.details?.eventName}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">Date & Time</label>
                              <p className="text-gray-900">{selectedApproval.details?.date} at {selectedApproval.details?.time}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">Venue</label>
                              <p className="text-gray-900">{selectedApproval.details?.venue}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">Event Type</label>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {selectedApproval.details?.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Organizer Information</h5>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-600">Organizer</label>
                              <p className="text-gray-900">{selectedApproval.details?.organizer}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">Contact Email</label>
                              <p className="text-gray-900">{selectedApproval.details?.contactEmail}</p>
                            </div>
                            {selectedApproval.details?.contactPhone && (
                              <div>
                                <label className="block text-sm font-medium text-gray-600">Contact Phone</label>
                                <p className="text-gray-900">{selectedApproval.details?.contactPhone}</p>
                              </div>
                            )}
                            <div>
                              <label className="block text-sm font-medium text-gray-600">Expected Attendees</label>
                              <p className="text-gray-900">{selectedApproval.details?.expectedAttendees}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600">Budget</label>
                              <p className="text-gray-900">${selectedApproval.details?.budget?.toLocaleString() || 'Not specified'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                        <p className="text-gray-900 leading-relaxed">{selectedApproval.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Modifications */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Admin Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Capacity</label>
                        <input
                          type="number"
                          min="1"
                          value={eventApprovalData.capacity}
                          onChange={(e) => setEventApprovalData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 50 }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Price ($)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={eventApprovalData.price}
                          onChange={(e) => setEventApprovalData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Event Status</label>
                        <select
                          value={eventApprovalData.status}
                          onChange={(e) => setEventApprovalData(prev => ({ ...prev, status: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes (Optional)</label>
                      <textarea
                        rows={3}
                        value={eventApprovalData.notes}
                        onChange={(e) => setEventApprovalData(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                        placeholder="Add any notes or modifications for this event..."
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      This event will be added to the events calendar upon approval.
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setShowEventApprovalModal(false)}
                        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReject(selectedApproval.id)}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Reject Event
                      </button>
                      <button
                        onClick={handleEventApprovalSubmit}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Approve Event
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