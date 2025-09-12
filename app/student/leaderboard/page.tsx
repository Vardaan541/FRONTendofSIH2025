'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import { Trophy, Medal, Award, Users, Building, MapPin, Star } from 'lucide-react'

interface LeaderboardEntry {
  id: string
  name: string
  position: string
  company: string
  location: string
  followers: number
  graduationYear: number
  department: string
  rating: number
  sessionsCompleted: number
  profileImage?: string
}

export default function StudentLeaderboard() {
  const { user } = useStore()
  const router = useRouter()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [sortBy, setSortBy] = useState<'followers' | 'rating' | 'sessions'>('followers')

  useEffect(() => {
    // Allow access even without authentication for demo purposes
    // if (!user || user.role !== 'student') {
    //   router.push('/')
    //   return
    // }

    // Mock leaderboard data
    const mockData: LeaderboardEntry[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        position: 'Senior Software Engineer',
        company: 'Google',
        location: 'San Francisco, CA',
        followers: 250,
        graduationYear: 2015,
        department: 'Computer Science',
        rating: 4.9,
        sessionsCompleted: 45
      },
      {
        id: '2',
        name: 'Michael Chen',
        position: 'Product Manager',
        company: 'Microsoft',
        location: 'Seattle, WA',
        followers: 200,
        graduationYear: 2016,
        department: 'Computer Science',
        rating: 4.8,
        sessionsCompleted: 38
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        position: 'Data Scientist',
        company: 'Amazon',
        location: 'Austin, TX',
        followers: 180,
        graduationYear: 2017,
        department: 'Computer Science',
        rating: 4.9,
        sessionsCompleted: 42
      },
      {
        id: '4',
        name: 'David Kim',
        position: 'UX Designer',
        company: 'Apple',
        location: 'Cupertino, CA',
        followers: 150,
        graduationYear: 2018,
        department: 'Design',
        rating: 4.7,
        sessionsCompleted: 35
      },
      {
        id: '5',
        name: 'Lisa Wang',
        position: 'Marketing Director',
        company: 'Meta',
        location: 'Menlo Park, CA',
        followers: 120,
        graduationYear: 2014,
        department: 'Business',
        rating: 4.6,
        sessionsCompleted: 28
      },
      {
        id: '6',
        name: 'Alex Thompson',
        position: 'DevOps Engineer',
        company: 'Netflix',
        location: 'Los Gatos, CA',
        followers: 110,
        graduationYear: 2019,
        department: 'Computer Science',
        rating: 4.8,
        sessionsCompleted: 32
      },
      {
        id: '7',
        name: 'Maria Garcia',
        position: 'Software Architect',
        company: 'Salesforce',
        location: 'San Francisco, CA',
        followers: 95,
        graduationYear: 2013,
        department: 'Computer Science',
        rating: 4.9,
        sessionsCompleted: 40
      },
      {
        id: '8',
        name: 'James Wilson',
        position: 'Technical Lead',
        company: 'Uber',
        location: 'San Francisco, CA',
        followers: 85,
        graduationYear: 2016,
        department: 'Computer Science',
        rating: 4.7,
        sessionsCompleted: 25
      }
    ]

    setLeaderboard(mockData)
  }, [user, router])

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 2:
        return <Award className="w-6 h-6 text-orange-500" />
      default:
        return <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
          {index + 1}
        </span>
    }
  }

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
      case 1:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
      case 2:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    switch (sortBy) {
      case 'followers':
        return b.followers - a.followers
      case 'rating':
        return b.rating - a.rating
      case 'sessions':
        return b.sessionsCompleted - a.sessionsCompleted
      default:
        return 0
    }
  })

  // Allow access even without authentication for demo purposes
  // if (!user || user.role !== 'student') {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="student" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Alumni Leaderboard</h1>
              <p className="text-gray-600">Top performing alumni based on community engagement</p>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex space-x-2">
              {[
                { key: 'followers', label: 'Followers', icon: Users },
                { key: 'rating', label: 'Rating', icon: Star },
                { key: 'sessions', label: 'Sessions', icon: Award }
              ].map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.key}
                    onClick={() => setSortBy(option.key as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                      sortBy === option.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          {sortedLeaderboard.map((alumni, index) => (
            <div
              key={alumni.id}
              className={`rounded-lg border-2 p-6 transition-all hover:shadow-md ${getRankColor(index)}`}
            >
              <div className="flex items-center space-x-6">
                {/* Rank */}
                <div className="flex-shrink-0">
                  {getRankIcon(index)}
                </div>

                {/* Profile */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {alumni.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{alumni.name}</h3>
                      <p className="text-gray-600 mb-2">{alumni.position}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{alumni.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{alumni.location}</span>
                        </div>
                        <span>Class of {alumni.graduationYear}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{alumni.followers}</p>
                          <p className="text-sm text-gray-600">Followers</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-2xl font-bold text-gray-900">{alumni.rating}</span>
                          </div>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{alumni.sessionsCompleted}</p>
                          <p className="text-sm text-gray-600">Sessions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{leaderboard.length}</p>
              <p className="text-gray-600">Total Alumni</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {leaderboard.reduce((sum, alumni) => sum + alumni.followers, 0)}
              </p>
              <p className="text-gray-600">Total Followers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {leaderboard.reduce((sum, alumni) => sum + alumni.sessionsCompleted, 0)}
              </p>
              <p className="text-gray-600">Sessions Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {(leaderboard.reduce((sum, alumni) => sum + alumni.rating, 0) / leaderboard.length).toFixed(1)}
              </p>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
