'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import CommentModal from '@/components/CommentModal'
import DonationModal from '@/components/DonationModal'
import { FileText, Trophy, Users, MessageCircle, Heart, Share2, Plus, TrendingUp, Target, Award, Calendar, MapPin, Clock, DollarSign, X, Gift } from 'lucide-react'

export default function AlumniDashboard() {
  const { user, posts, setUser, updatePost, comments, careerMilestones, careerGoals, skillProgress } = useStore()
  const router = useRouter()
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [showEventRequestModal, setShowEventRequestModal] = useState(false)
  const [showDonationModal, setShowDonationModal] = useState(false)
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
  const [leaderboard, setLeaderboard] = useState([
    { id: '1', name: 'Sarah Johnson', followers: 250, position: 'Senior Software Engineer', company: 'Google' },
    { id: '2', name: 'Michael Chen', followers: 200, position: 'Product Manager', company: 'Microsoft' },
    { id: '3', name: 'Emily Rodriguez', followers: 180, position: 'Data Scientist', company: 'Amazon' },
    { id: '4', name: 'David Kim', followers: 150, position: 'UX Designer', company: 'Apple' },
    { id: '5', name: 'Lisa Wang', followers: 120, position: 'Marketing Director', company: 'Meta' },
  ])

  useEffect(() => {
    console.log('Alumni dashboard - user:', user) // Debug log
    if (!user || user.role !== 'alumni') {
      console.log('Redirecting to home - user not found or not alumni') // Debug log
      router.push('/')
      return
    }

    // Initialize with some mock posts
    if (posts.length === 0) {
      const mockPosts = [
        {
          id: '1',
          authorId: '1',
          authorName: 'Sarah Johnson',
          authorImage: '',
          content: 'Just finished an amazing project at Google! The key to success in tech is continuous learning and networking. Happy to help any students who want to break into the industry! 🚀',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          likes: 45,
          comments: 12
        },
        {
          id: '2',
          authorId: '2',
          authorName: 'Michael Chen',
          authorImage: '',
          content: 'Product management tip: Always start with the user problem, not the solution. Spent the weekend mentoring some students and it reminded me why I love this field!',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          likes: 32,
          comments: 8
        },
        {
          id: '3',
          authorId: '3',
          authorName: 'Emily Rodriguez',
          authorImage: '',
          content: 'Data science is not just about algorithms - it\'s about asking the right questions and telling compelling stories with data. Excited to share more insights with our student community!',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
          likes: 28,
          comments: 15
        }
      ]
      mockPosts.forEach(post => {
        // This would normally be handled by the store
        console.log('Mock post:', post)
      })
    }
  }, [user, router, posts.length])

  if (!user || user.role !== 'alumni') {
    return null
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const handleLike = (postId: string) => {
    const post = posts.find(p => p.id === postId)
    if (post) {
      updatePost(postId, { likes: post.likes + 1 })
    }
  }

  const handleComment = (postId: string) => {
    setSelectedPostId(postId)
  }

  const handleCloseCommentModal = () => {
    setSelectedPostId(null)
  }

  const handleEventRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create event request object
    const eventRequest = {
      id: Date.now().toString(),
      type: 'event',
      title: `${eventRequestForm.title} - Event Request`,
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
        type: eventRequestForm.type,
        contactEmail: eventRequestForm.contactEmail,
        contactPhone: eventRequestForm.contactPhone,
        organizer: user?.name || 'Unknown'
      }
    }

    // In a real app, this would be sent to the backend
    console.log('Event request submitted:', eventRequest)
    
    // Show success message
    alert('Event request submitted successfully! It will be reviewed by the admin team.')
    
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
    setShowEventRequestModal(false)
  }

  const handleEventRequestFormChange = (field: string, value: string) => {
    setEventRequestForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="alumni" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Posts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Alumni Community Posts</h2>
                  <p className="text-gray-600">Share insights and connect with fellow alumni and students</p>
                </div>
                <button 
                  onClick={() => router.push('/alumni/create-post')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Post</span>
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {post.authorName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{post.authorName}</h3>
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-500 text-sm">{formatTimeAgo(post.timestamp)}</span>
                        </div>
                        <p className="text-gray-800 mb-4">{post.content}</p>
                        
                        {/* Post Image */}
                        {post.imageUrl && (
                          <div className="mb-4">
                            <img 
                              src={post.imageUrl} 
                              alt="Post image" 
                              className="max-w-full h-auto rounded-lg shadow-sm"
                              style={{ maxHeight: '400px' }}
                            />
                          </div>
                        )}
                        
                        {/* Post Attachment */}
                        {post.attachmentUrl && post.attachmentName && (
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{post.attachmentName}</p>
                                <p className="text-xs text-gray-500">Attachment</p>
                              </div>
                              <a 
                                href={post.attachmentUrl} 
                                download={post.attachmentName}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                Download
                              </a>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-6 text-gray-500">
                          <button 
                            onClick={() => handleLike(post.id)}
                            className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                          >
                            <Heart className="w-5 h-5" />
                            <span>{post.likes}</span>
                          </button>
                          <button 
                            onClick={() => handleComment(post.id)}
                            className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span>{comments.filter(c => c.postId === post.id).length}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600 mb-4">Be the first to share insights with the community!</p>
                  <button 
                    onClick={() => router.push('/alumni/create-post')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Post
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome back, {user.name}!</h3>
              <p className="text-gray-600 mb-4">Share your expertise and help students grow</p>
              <div className="space-y-2">
                <button 
                  onClick={() => router.push('/alumni/students')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Student Requests
                </button>
                <button 
                  onClick={() => router.push('/alumni/create-post')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Create New Post
                </button>
                <button 
                  onClick={() => router.push('/alumni/career-progress')}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Target className="w-4 h-4" />
                  <span>Career Progress</span>
                </button>
                <button 
                  onClick={() => setShowEventRequestModal(true)}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Event</span>
                </button>
              </div>
            </div>

            {/* Your Impact */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Your Impact
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-medium text-gray-900">{user.followers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Created</span>
                  <span className="font-medium text-gray-900">
                    {posts.filter(post => post.authorId === user.id).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Likes</span>
                  <span className="font-medium text-gray-900">
                    {posts
                      .filter(post => post.authorId === user.id)
                      .reduce((total, post) => total + post.likes, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Comments</span>
                  <span className="font-medium text-gray-900">
                    {comments
                      .filter(comment => 
                        posts.some(post => post.id === comment.postId && post.authorId === user.id)
                      ).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Support Platform */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg shadow-sm border border-red-100 p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Gift className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Support Our Platform</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Help us maintain and improve the alumni mentoring platform for the next generation of students.
              </p>
              <button 
                onClick={() => setShowDonationModal(true)}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span>Make a Donation</span>
              </button>
            </div>

            {/* Career Progress Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-900">Career Progress</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Milestones</span>
                  <span className="font-medium text-gray-900">{careerMilestones.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Goals</span>
                  <span className="font-medium text-gray-900">
                    {careerGoals.filter(goal => goal.status === 'in_progress').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Skills Tracked</span>
                  <span className="font-medium text-gray-900">{skillProgress.length}</span>
                </div>
              </div>
              <button 
                onClick={() => router.push('/alumni/career-progress')}
                className="w-full mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                View Full Progress →
              </button>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-900">Top Alumni</h3>
              </div>
              <div className="space-y-3">
                {leaderboard.map((alumni, index) => (
                  <div key={alumni.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{alumni.name}</p>
                      <p className="text-sm text-gray-600">{alumni.position} at {alumni.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{alumni.followers}</p>
                      <p className="text-xs text-gray-500">followers</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => router.push('/alumni/leaderboard')}
                className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Full Leaderboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        postId={selectedPostId || ''}
        isOpen={selectedPostId !== null}
        onClose={handleCloseCommentModal}
      />

      {/* Event Request Modal */}
      {showEventRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-white border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Request New Event</h3>
              <button
                onClick={() => setShowEventRequestModal(false)}
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                  <select
                    required
                    value={eventRequestForm.type}
                    onChange={(e) => handleEventRequestFormChange('type', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Time *</label>
                  <input
                    type="time"
                    required
                    value={eventRequestForm.time}
                    onChange={(e) => handleEventRequestFormChange('time', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                    placeholder="Your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={eventRequestForm.contactPhone}
                    onChange={(e) => handleEventRequestFormChange('contactPhone', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
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
                    onClick={() => setShowEventRequestModal(false)}
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

      {/* Donation Modal */}
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        donorName={user?.name || 'Alumni'}
        donorEmail={user?.email || ''}
      />
    </div>
  )
}
