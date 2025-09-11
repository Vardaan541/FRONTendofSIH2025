'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import { FileText, Trophy, Users, MessageCircle, Heart, Share2 } from 'lucide-react'

export default function StudentDashboard() {
  const { user, posts, setUser } = useStore()
  const router = useRouter()
  const [leaderboard, setLeaderboard] = useState([
    { id: '1', name: 'Sarah Johnson', followers: 250, position: 'Senior Software Engineer', company: 'Google' },
    { id: '2', name: 'Michael Chen', followers: 200, position: 'Product Manager', company: 'Microsoft' },
    { id: '3', name: 'Emily Rodriguez', followers: 180, position: 'Data Scientist', company: 'Amazon' },
    { id: '4', name: 'David Kim', followers: 150, position: 'UX Designer', company: 'Apple' },
    { id: '5', name: 'Lisa Wang', followers: 120, position: 'Marketing Director', company: 'Meta' },
  ])

  useEffect(() => {
    console.log('Student dashboard - user:', user) // Debug log
    if (!user || user.role !== 'student') {
      console.log('Redirecting to home - user not found or not student') // Debug log
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

  if (!user || user.role !== 'student') {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="student" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Posts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Posts from Alumni</h2>
              <p className="text-gray-600">Stay updated with insights and experiences from our alumni community</p>
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
                        <div className="flex items-center space-x-6 text-gray-500">
                          <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span>{post.comments}</span>
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
                  <p className="text-gray-600">Alumni posts will appear here once they start sharing content.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome back, {user.name}!</h3>
              <p className="text-gray-600 mb-4">Ready to connect with alumni and grow your network?</p>
              <div className="space-y-2">
                <button 
                  onClick={() => router.push('/student/alumni')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Browse Alumni
                </button>
                <button 
                  onClick={() => router.push('/student/career-ai')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Career AI Assistant
                </button>
              </div>
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
                onClick={() => router.push('/student/leaderboard')}
                className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Full Leaderboard
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Following</span>
                  <span className="font-medium text-gray-900">{user.following || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions Booked</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Liked</span>
                  <span className="font-medium text-gray-900">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
