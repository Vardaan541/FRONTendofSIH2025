'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import { User, Mail, Calendar, MapPin, Edit3, Save, X, Building, DollarSign, Star } from 'lucide-react'

export default function AlumniProfile() {
  const { user, setUser } = useStore()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    department: '',
    graduationYear: '',
    currentPosition: '',
    company: '',
    location: '',
    hourlyRate: '',
    linkedin: '',
    github: ''
  })

  useEffect(() => {
    // Allow access even without authentication for demo purposes
    // if (!user || user.role !== 'alumni') {
    //   router.push('/')
    //   return
    // }

    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      department: user?.department || '',
      graduationYear: user?.graduationYear?.toString() || '',
      currentPosition: user?.currentPosition || '',
      company: user?.company || '',
      location: '',
      hourlyRate: '100',
      linkedin: '',
      github: ''
    })
  }, [user, router])

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        department: formData.department,
        graduationYear: parseInt(formData.graduationYear) || user?.graduationYear,
        currentPosition: formData.currentPosition,
        company: formData.company
      }
      setUser(updatedUser)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        department: user?.department || '',
        graduationYear: user?.graduationYear?.toString() || '',
        currentPosition: user?.currentPosition || '',
        company: user?.company || '',
        location: '',
        hourlyRate: '100',
        linkedin: '',
        github: ''
      })
    }
    setIsEditing(false)
  }

  // Allow access even without authentication for demo purposes
  // if (!user || user.role !== 'alumni') {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="alumni" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-green-600">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{user?.name || 'Alumni'}</h1>
                  <p className="text-green-100 text-lg">{user?.currentPosition || 'Software Engineer'}</p>
                  <p className="text-green-200">{user?.company || 'Tech Corp'} • Class of {user?.graduationYear || '2020'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-enhanced"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-enhanced"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Position
                    </label>
                    <input
                      type="text"
                      value={formData.currentPosition}
                      onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                      className="input-enhanced"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="input-enhanced"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="input-enhanced"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Graduation Year
                    </label>
                    <input
                      type="number"
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                      className="input-enhanced"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="textarea-enhanced"
                    placeholder="Tell us about your professional journey, expertise, and how you can help students..."
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* About Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {user?.bio || 'Experienced software engineer passionate about mentoring the next generation of developers. I love sharing insights about career growth, technical challenges, and industry trends.'}
                  </p>
                </div>

                {/* Professional Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Current Position</p>
                        <p className="font-medium text-gray-900">{user?.currentPosition || 'Software Engineer'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Company</p>
                        <p className="font-medium text-gray-900">{user?.company || 'Tech Corp'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">San Francisco, CA</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">Mentoring Rate</p>
                        <p className="font-medium text-gray-900">$100/hour</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Academic Background</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium text-gray-900">{user?.department || 'Computer Science'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Graduation Year</p>
                        <p className="font-medium text-gray-900">{user?.graduationYear || '2020'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Degree</p>
                        <p className="font-medium text-gray-900">Bachelor of Science</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">GPA</p>
                        <p className="font-medium text-gray-900">3.9/4.0</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mentoring Stats */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Mentoring Statistics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{user?.followers || 0}</p>
                      <p className="text-blue-800">Followers</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">0</p>
                      <p className="text-green-800">Sessions Completed</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">0</p>
                      <p className="text-purple-800">Students Helped</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-2xl font-bold text-yellow-600">4.8</span>
                      </div>
                      <p className="text-yellow-800">Average Rating</p>
                    </div>
                  </div>
                </div>

                {/* Expertise Areas */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {['Software Development', 'Product Management', 'Career Guidance', 'Technical Interviews', 'Leadership', 'Startup Experience', 'Full-Stack Development'].map((skill) => (
                      <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
