'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { useStore, type EventRequest } from '@/lib/store'
import { 
  CheckCircle, 
  X, 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  Eye,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  TrendingUp,
  Activity,
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
  Layers,
  Plus,
  Download,
  RefreshCw,
  User,
  Phone,
  Mail,
  FileText
} from 'lucide-react'

// EventRequest interface is now imported from the store

export default function EventApprovalsPage() {
  const { eventRequests, updateEventRequest } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('pending')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<EventRequest | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [approvalData, setApprovalData] = useState({
    capacity: 50,
    price: 0,
    status: 'upcoming',
    notes: '',
    approvedDate: '',
    approvedTime: ''
  })

  // Event requests are now managed by the shared store

  const filteredRequests = eventRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.details.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    const matchesPriority = filterPriority === 'all' || request.priority === filterPriority
    const matchesType = filterType === 'all' || request.details.type === filterType
    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conference': return 'bg-blue-100 text-blue-800'
      case 'networking': return 'bg-green-100 text-green-800'
      case 'workshop': return 'bg-purple-100 text-purple-800'
      case 'reunion': return 'bg-orange-100 text-orange-800'
      case 'social': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleApprove = (requestId: string) => {
    const request = eventRequests.find(r => r.id === requestId)
    if (request) {
      setSelectedRequest(request)
      setApprovalData({
        capacity: request.details.expectedAttendees,
        price: 0,
        status: 'upcoming',
        notes: '',
        approvedDate: request.details.date,
        approvedTime: request.details.time
      })
      setShowApprovalModal(true)
    }
  }

  const handleReject = (requestId: string) => {
    const request = eventRequests.find(r => r.id === requestId)
    if (request) {
      updateEventRequest(requestId, { status: 'rejected' })
      alert(`Event "${request.details.eventName}" has been rejected.`)
    }
  }

  const handleApprovalSubmit = () => {
    if (!selectedRequest) return

    // Create the approved event with admin modifications
    const eventData = {
      id: `EVT-${Date.now()}`,
      title: selectedRequest.details.eventName,
      description: selectedRequest.description,
      date: approvalData.approvedDate,
      time: approvalData.approvedTime,
      venue: selectedRequest.details.venue,
      capacity: approvalData.capacity,
      registered: 0,
      status: approvalData.status as 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
      type: selectedRequest.details.type,
      price: approvalData.price,
      organizer: selectedRequest.details.organizer,
      collegeId: selectedRequest.collegeId,
      adminNotes: approvalData.notes,
      approvedBy: 'Admin',
      approvedAt: new Date().toISOString()
    }

    // Update request status
    updateEventRequest(selectedRequest.id, { status: 'approved' })

    // In a real app, this would be sent to the backend
    console.log('Creating approved event:', eventData)

    alert(`Event "${selectedRequest.details.eventName}" has been approved and will be added to the events calendar!`)
    
    setShowApprovalModal(false)
    setSelectedRequest(null)
  }

  const handleViewDetails = (request: EventRequest) => {
    setSelectedRequest(request)
    setShowDetailModal(true)
  }

  const pendingCount = eventRequests.filter(r => r.status === 'pending').length
  const approvedCount = eventRequests.filter(r => r.status === 'approved').length
  const rejectedCount = eventRequests.filter(r => r.status === 'rejected').length
  const highPriorityCount = eventRequests.filter(r => r.status === 'pending' && r.priority === 'high').length

  return (
    <AdminLayout>
      <div className="px-8 pb-8 space-y-8">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                    Event Request Approvals
                  </h1>
                  <p className="text-green-100 text-lg mt-2">Review and approve event submissions from alumni</p>
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
                <span className="text-sm font-medium">Last updated: 1 min ago</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Avg. response time: 1.8h</span>
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
                <p className="text-sm text-gray-600 font-medium">Approved</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{approvedCount}</p>
                <p className="text-xs text-gray-500 mt-1">Events approved</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rejected</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{rejectedCount}</p>
                <p className="text-xs text-gray-500 mt-1">Events rejected</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl">
                <X className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">High Priority</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{highPriorityCount}</p>
                <p className="text-xs text-gray-500 mt-1">Urgent requests</p>
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
                  placeholder="Search event requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="all">All Types</option>
                    <option value="conference">Conference</option>
                    <option value="networking">Networking</option>
                    <option value="workshop">Workshop</option>
                    <option value="reunion">Reunion</option>
                    <option value="social">Social</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Event Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-6 flex-1">
                  <div className="p-4 rounded-xl bg-green-100">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{request.title}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(request.details.type)}`}>
                        {request.details.type}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority} priority
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{request.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(request.details.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{request.details.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{request.details.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{request.details.expectedAttendees} attendees</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mt-3">
                      <span className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>Submitted by: {request.submittedBy}</span>
                      </span>
                      <span>•</span>
                      <span>{new Date(request.submittedDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>ID: {request.collegeId}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 ml-6">
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="p-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="p-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-xl transition-all duration-200"
                        title="Approve Event"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                        title="Reject Event"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Detail Modal */}
        {showDetailModal && selectedRequest && (
          <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Event Request Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                      <p className="text-gray-900 font-medium">{selectedRequest.details.eventName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedRequest.details.type)}`}>
                        {selectedRequest.details.type}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                      <p className="text-gray-900 font-medium">{selectedRequest.details.date} at {selectedRequest.details.time}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
                      <p className="text-gray-900 font-medium">{selectedRequest.details.venue}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expected Attendees</label>
                      <p className="text-gray-900 font-medium">{selectedRequest.details.expectedAttendees}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                      <p className="text-gray-900 font-medium">${selectedRequest.details.budget?.toLocaleString() || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="text-gray-900 leading-relaxed">{selectedRequest.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Organizer Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                      <p className="text-gray-900 font-medium">{selectedRequest.details.organizer}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <p className="text-gray-900 font-medium">{selectedRequest.details.contactEmail}</p>
                    </div>
                    {selectedRequest.details.contactPhone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                        <p className="text-gray-900 font-medium">{selectedRequest.details.contactPhone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Request Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Submitted By</label>
                      <p className="text-gray-900 font-medium">{selectedRequest.submittedBy}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Submitted Date</label>
                      <p className="text-gray-900 font-medium">{new Date(selectedRequest.submittedDate).toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                        {selectedRequest.priority}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Request ID: {selectedRequest.collegeId}
                  </div>
                  <div className="flex items-center space-x-4">
                    {selectedRequest.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            handleApprove(selectedRequest.id)
                            setShowDetailModal(false)
                          }}
                          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            handleReject(selectedRequest.id)
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
        {showApprovalModal && selectedRequest && (
          <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Approve Event Request</h3>
                <button
                  onClick={() => setShowApprovalModal(false)}
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
                            <p className="text-gray-900">{selectedRequest.details.eventName}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600">Date & Time</label>
                            <p className="text-gray-900">{selectedRequest.details.date} at {selectedRequest.details.time}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600">Venue</label>
                            <p className="text-gray-900">{selectedRequest.details.venue}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600">Event Type</label>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedRequest.details.type)}`}>
                              {selectedRequest.details.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Organizer Information</h5>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-600">Organizer</label>
                            <p className="text-gray-900">{selectedRequest.details.organizer}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600">Contact Email</label>
                            <p className="text-gray-900">{selectedRequest.details.contactEmail}</p>
                          </div>
                          {selectedRequest.details.contactPhone && (
                            <div>
                              <label className="block text-sm font-medium text-gray-600">Contact Phone</label>
                              <p className="text-gray-900">{selectedRequest.details.contactPhone}</p>
                            </div>
                          )}
                          <div>
                            <label className="block text-sm font-medium text-gray-600">Expected Attendees</label>
                            <p className="text-gray-900">{selectedRequest.details.expectedAttendees}</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600">Budget</label>
                            <p className="text-gray-900">${selectedRequest.details.budget?.toLocaleString() || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                      <p className="text-gray-900 leading-relaxed">{selectedRequest.description}</p>
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
                        value={approvalData.capacity}
                        onChange={(e) => setApprovalData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 50 }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Price ($)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={approvalData.price}
                        onChange={(e) => setApprovalData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Status</label>
                      <select
                        value={approvalData.status}
                        onChange={(e) => setApprovalData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Approved Date</label>
                      <input
                        type="date"
                        value={approvalData.approvedDate}
                        onChange={(e) => setApprovalData(prev => ({ ...prev, approvedDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Approved Time</label>
                      <input
                        type="time"
                        value={approvalData.approvedTime}
                        onChange={(e) => setApprovalData(prev => ({ ...prev, approvedTime: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes (Optional)</label>
                    <textarea
                      rows={3}
                      value={approvalData.notes}
                      onChange={(e) => setApprovalData(prev => ({ ...prev, notes: e.target.value }))}
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
                      onClick={() => setShowApprovalModal(false)}
                      className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReject(selectedRequest.id)}
                      className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Reject Event
                    </button>
                    <button
                      onClick={handleApprovalSubmit}
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
