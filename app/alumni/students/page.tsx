'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import { Search, Check, X, Clock, DollarSign, MessageCircle, User, Calendar } from 'lucide-react'

interface Student {
  id: string
  name: string
  email: string
  department: string
  graduationYear: number
  bio: string
  profileImage?: string
}

interface SessionRequest {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  hours: number
  amount: number
  status: 'pending' | 'accepted' | 'rejected'
  message: string
  timestamp: Date
}

export default function MyStudents() {
  const { user, sessionRequests, updateSessionRequest } = useStore()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'students' | 'requests'>('requests')
  const [students, setStudents] = useState<Student[]>([])
  const [requests, setRequests] = useState<SessionRequest[]>([])

  useEffect(() => {
    if (!user || user.role !== 'alumni') {
      router.push('/')
      return
    }

    // Mock students data
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'John Student',
        email: 'john.student@university.edu',
        department: 'Computer Science',
        graduationYear: 2025,
        bio: 'Passionate about web development and machine learning. Looking to gain industry experience and mentorship.'
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@university.edu',
        department: 'Computer Science',
        graduationYear: 2024,
        bio: 'Interested in product management and user experience design. Seeking guidance on career transition.'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@university.edu',
        department: 'Computer Science',
        graduationYear: 2026,
        bio: 'Full-stack developer with focus on React and Node.js. Want to learn about scaling applications.'
      }
    ]

    // Mock session requests
    const mockRequests: SessionRequest[] = [
      {
        id: '1',
        studentId: '1',
        studentName: 'John Student',
        studentEmail: 'john.student@university.edu',
        hours: 2,
        amount: 200,
        status: 'pending',
        message: 'Hi! I\'m really interested in learning about software architecture and system design. Could we discuss best practices and career growth in this area?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: '2',
        studentId: '2',
        studentName: 'Sarah Wilson',
        studentEmail: 'sarah.wilson@university.edu',
        hours: 1,
        amount: 100,
        status: 'pending',
        message: 'I\'m considering a career switch to product management. Would love to get your insights on the role and how to prepare for interviews.',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
      },
      {
        id: '3',
        studentId: '3',
        studentName: 'Mike Johnson',
        studentEmail: 'mike.johnson@university.edu',
        hours: 3,
        amount: 300,
        status: 'accepted',
        message: 'Thank you for accepting my session request! Looking forward to our discussion about full-stack development.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      }
    ]

    setStudents(mockStudents)
    setRequests(mockRequests)
  }, [user, router])

  const handleAcceptRequest = (requestId: string) => {
    updateSessionRequest(requestId, 'accepted')
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ))
  }

  const handleRejectRequest = (requestId: string) => {
    updateSessionRequest(requestId, 'rejected')
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' } : req
    ))
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pendingRequests = requests.filter(req => req.status === 'pending')
  const acceptedRequests = requests.filter(req => req.status === 'accepted')
  const rejectedRequests = requests.filter(req => req.status === 'rejected')

  if (!user || user.role !== 'alumni') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="alumni" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Students</h1>
          <p className="text-gray-600">Connect with students and manage mentoring session requests</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Session Requests ({pendingRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'students'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Students ({students.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {activeTab === 'requests' ? (
          <div className="space-y-6">
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-yellow-500" />
                  Pending Requests ({pendingRequests.length})
                </h2>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-lg shadow-sm border p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {request.studentName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{request.studentName}</h3>
                              <p className="text-sm text-gray-600">{request.studentEmail}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{request.message}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{request.hours} hour(s)</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>${request.amount}</span>
                            </div>
                            <span>{formatTimeAgo(request.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-6">
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2"
                          >
                            <Check className="w-4 h-4" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accepted Requests */}
            {acceptedRequests.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" />
                  Accepted Sessions ({acceptedRequests.length})
                </h2>
                <div className="space-y-4">
                  {acceptedRequests.map((request) => (
                    <div key={request.id} className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {request.studentName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.studentName}</h3>
                          <p className="text-sm text-gray-600">{request.studentEmail}</p>
                        </div>
                        <span className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Accepted
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{request.message}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{request.hours} hour(s)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>${request.amount}</span>
                        </div>
                        <span>{formatTimeAgo(request.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rejected Requests */}
            {rejectedRequests.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <X className="w-5 h-5 mr-2 text-red-500" />
                  Rejected Requests ({rejectedRequests.length})
                </h2>
                <div className="space-y-4">
                  {rejectedRequests.map((request) => (
                    <div key={request.id} className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {request.studentName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.studentName}</h3>
                          <p className="text-sm text-gray-600">{request.studentEmail}</p>
                        </div>
                        <span className="ml-auto bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Rejected
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{request.message}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{request.hours} hour(s)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>${request.amount}</span>
                        </div>
                        <span>{formatTimeAgo(request.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {requests.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No session requests yet</h3>
                <p className="text-gray-600">Students will be able to request mentoring sessions with you</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                    <p className="text-gray-600">{student.department}</p>
                    <p className="text-sm text-gray-500">Class of {student.graduationYear}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">{student.bio}</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'students' && filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}
