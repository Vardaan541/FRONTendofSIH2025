'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import SessionBookingForm from '@/components/SessionBookingForm'
import { Search, UserPlus, Calendar, DollarSign, MessageCircle, MapPin, Building } from 'lucide-react'

interface Alumni {
  id: string
  name: string
  email: string
  bio: string
  department: string
  graduationYear: number
  currentPosition: string
  company: string
  location: string
  followers: number
  isFollowing: boolean
  hourlyRate: number
  profileImage?: string
}

export default function MyAlumni() {
  const { user } = useStore()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const [alumni, setAlumni] = useState<Alumni[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      bio: 'Senior Software Engineer with 8+ years of experience in full-stack development. Passionate about mentoring students and helping them break into tech.',
      department: 'Computer Science',
      graduationYear: 2015,
      currentPosition: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      followers: 250,
      isFollowing: false,
      hourlyRate: 150
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      bio: 'Product Manager at Microsoft with expertise in AI/ML products. Love sharing insights about product strategy and career growth.',
      department: 'Computer Science',
      graduationYear: 2016,
      currentPosition: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      followers: 200,
      isFollowing: true,
      hourlyRate: 120
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      bio: 'Data Scientist at Amazon working on recommendation systems. Excited to help students understand data science and machine learning.',
      department: 'Computer Science',
      graduationYear: 2017,
      currentPosition: 'Data Scientist',
      company: 'Amazon',
      location: 'Austin, TX',
      followers: 180,
      isFollowing: false,
      hourlyRate: 100
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@example.com',
      bio: 'UX Designer at Apple focused on creating intuitive user experiences. Happy to share design thinking and career advice.',
      department: 'Design',
      graduationYear: 2018,
      currentPosition: 'UX Designer',
      company: 'Apple',
      location: 'Cupertino, CA',
      followers: 150,
      isFollowing: false,
      hourlyRate: 90
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@example.com',
      bio: 'Marketing Director at Meta with expertise in digital marketing and brand strategy. Love helping students navigate marketing careers.',
      department: 'Business',
      graduationYear: 2014,
      currentPosition: 'Marketing Director',
      company: 'Meta',
      location: 'Menlo Park, CA',
      followers: 120,
      isFollowing: true,
      hourlyRate: 80
    }
  ])

  useEffect(() => {
    // Allow access even without authentication for demo purposes
    // if (!user || user.role !== 'student') {
    //   router.push('/')
    //   return
    // }
  }, [user, router])

  const handleFollow = (alumniId: string) => {
    setAlumni(prev => prev.map(alum => 
      alum.id === alumniId 
        ? { ...alum, isFollowing: !alum.isFollowing, followers: alum.isFollowing ? alum.followers - 1 : alum.followers + 1 }
        : alum
    ))
  }

  const handleBookSession = (alumni: Alumni) => {
    setSelectedAlumni(alumni)
    setShowBookingModal(true)
  }

  const handleCloseBookingModal = () => {
    setShowBookingModal(false)
    setSelectedAlumni(null)
  }

  const filteredAlumni = alumni.filter(alum =>
    alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alum.currentPosition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Allow access even without authentication for demo purposes
  // if (!user || user.role !== 'student') {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="student" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Alumni Network</h1>
          <p className="text-gray-600">Connect with alumni, follow their journeys, and book mentoring sessions</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search alumni by name, company, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((alum) => (
            <div key={alum.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {alum.name.charAt(0)}
                  </span>
                </div>
                <button
                  onClick={() => handleFollow(alum.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    alum.isFollowing
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {alum.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{alum.name}</h3>
                <p className="text-gray-600 mb-2">{alum.currentPosition}</p>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Building className="w-4 h-4 mr-1" />
                  <span>{alum.company}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{alum.location}</span>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{alum.bio}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Class of {alum.graduationYear}</span>
                <span>{alum.followers} followers</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleBookSession(alum)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Session</span>
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 text-center">
                <span className="text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  ${alum.hourlyRate}/hour
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      {/* Session Booking Form */}
      {showBookingModal && selectedAlumni && (
        <SessionBookingForm
          alumni={selectedAlumni}
          isOpen={showBookingModal}
          onClose={handleCloseBookingModal}
        />
      )}
    </div>
  )
}
