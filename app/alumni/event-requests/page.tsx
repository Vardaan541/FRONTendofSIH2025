'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore, type EventRequest } from '@/lib/store'
import Navigation from '@/components/Navigation'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  CheckCircle, 
  X, 
  Eye,
  Plus,
  AlertCircle,
  TrendingUp
} from 'lucide-react'

// EventRequest interface is now imported from the store

export default function EventRequestsPage() {
  const { user, eventRequests, addEventRequest } = useStore()
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [eventRequestForm, setEventRequestForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    expectedAttendees: '',
    budget: '',
    type: 'networking',
    contactEmail: user?.email || '',
    contactPhone: ''
  })

  useEffect(() => {
    // Allow access even without authentication for demo purposes
    // if (!user || user.role !== 'alumni') {
    //   router.push('/')
    //   return
    // }
  }, [user, router])

  const showNotificationMessage = (message: string) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 5000)
  }

  const handleEventRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newRequest: EventRequest = {
      id: Date.now().toString(),
      title: eventRequestForm.title,
      description: eventRequestForm.description,
      submittedBy: user?.name || 'Unknown',
      submittedDate: new Date().toISOString(),
      status: 'pending',
      priority: 'medium',
      collegeId: `EVT-REQ-${Date.now()}`,
      details: {
        eventName: eventRequestForm.title,
        date: eventRequestForm.date,
        time: eventRequestForm.time,
        venue: eventRequestForm.venue,
        expectedAttendees: parseInt(eventRequestForm.expectedAttendees) || 0,
        budget: parseFloat(eventRequestForm.budget) || 0,
        type: eventRequestForm.type as any,
        contactEmail: eventRequestForm.contactEmail,
        contactPhone: eventRequestForm.contactPhone,
        organizer: user?.name || 'Unknown'
      }
    }

    addEventRequest(newRequest)
    
    showNotificationMessage('Event request submitted successfully! It will be reviewed by the admin team.')
    
    // Reset form and close modal
    setEventRequestForm({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      expectedAttendees: '',
      budget: '',
      type: 'networking',
      contactEmail: user?.email || '',
      contactPhone: ''
    })
    setShowCreateModal(false)
  }

  const handleEventRequestFormChange = (field: string, value: string) => {
    setEventRequestForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle
      case 'pending': return Clock
      case 'rejected': return X
      default: return Clock
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'networking': return 'bg-blue-100 text-blue-800'
      case 'workshop': return 'bg-purple-100 text-purple-800'
      case 'conference': return 'bg-green-100 text-green-800'
      case 'reunion': return 'bg-orange-100 text-orange-800'
      case 'social': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter event requests to show only those submitted by the current user
  const userEventRequests = eventRequests.filter(request => 
    request.submittedBy === user?.name || request.details.organizer === user?.name
  )

  // Allow access even without authentication for demo purposes
  // if (!user || user.role !== 'alumni') {
  //   return null
  // }

  const pendingCount = eventRequests.filter(r => r.status === 'pending').length
  const approvedCount = eventRequests.filter(r => r.status === 'approved').length
  const rejectedCount = eventRequests.filter(r => r.status === 'rejected').length

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="alumni" />
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-3 animate-slide-in">
          <CheckCircle className="w-5 h-5" />
          <span>{notificationMessage}</span>
          <button
            onClick={() => setShowNotification(false)}
            className="text-white hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Requests</h1>
              <p className="text-gray-600 mt-2">Manage your event requests and track their approval status</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{eventRequests.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingCount}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Approved</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{approvedCount}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rejected</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{rejectedCount}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl">
                <X className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Event Requests List */}
        <div className="space-y-6">
          {userEventRequests.length > 0 ? (
            userEventRequests.map((request) => {
              const StatusIcon = getStatusIcon(request.status)
              return (
                <div key={request.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{request.title}</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(request.details.type)}`}>
                          {request.details.type}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {request.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">{request.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(request.details.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{request.details.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{request.details.venue}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{request.details.expectedAttendees} attendees</span>
                        </div>
                      </div>
                      
                      {request.details.budget > 0 && (
                        <div className="mt-3 flex items-center space-x-2 text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          <span>Budget: ${request.details.budget.toLocaleString()}</span>
                        </div>
                      )}
                      
                      <div className="mt-4 text-xs text-gray-500">
                        Submitted: {new Date(request.submittedDate).toLocaleString()} • ID: {request.collegeId}
                      </div>
                    </div>
                    
                    <div className="ml-6 flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200">
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No event requests yet</h3>
              <p className="text-gray-600 mb-6">Create your first event request to get started!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Event Request
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Event Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Create Event Request</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleEventRequestSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventRequestForm.title}
                    onChange={(e) => handleEventRequestFormChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                  <select
                    required
                    value={eventRequestForm.type}
                    onChange={(e) => handleEventRequestFormChange('type', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                  >
                    <option value="networking">Networking</option>
                    <option value="workshop">Workshop</option>
                    <option value="conference">Conference</option>
                    <option value="reunion">Reunion</option>
                    <option value="social">Social</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Description *</label>
                <textarea
                  required
                  rows={4}
                  value={eventRequestForm.description}
                  onChange={(e) => handleEventRequestFormChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                  placeholder="Describe the event, its purpose, and what attendees can expect"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={eventRequestForm.date}
                    onChange={(e) => handleEventRequestFormChange('date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Time *</label>
                  <input
                    type="time"
                    required
                    value={eventRequestForm.time}
                    onChange={(e) => handleEventRequestFormChange('time', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
                <input
                  type="text"
                  required
                  value={eventRequestForm.venue}
                  onChange={(e) => handleEventRequestFormChange('venue', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                  placeholder="Enter venue details"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Attendees</label>
                  <input
                    type="number"
                    min="1"
                    value={eventRequestForm.expectedAttendees}
                    onChange={(e) => handleEventRequestFormChange('expectedAttendees', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                    placeholder="Estimated number of attendees"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget (if applicable)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={eventRequestForm.budget}
                    onChange={(e) => handleEventRequestFormChange('budget', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                    placeholder="Estimated budget"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={eventRequestForm.contactEmail}
                    onChange={(e) => handleEventRequestFormChange('contactEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                    placeholder="Your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={eventRequestForm.contactPhone}
                    onChange={(e) => handleEventRequestFormChange('contactPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  * Required fields. Your request will be reviewed by the admin team.
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
