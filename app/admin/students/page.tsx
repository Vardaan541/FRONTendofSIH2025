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
  Mail,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  UserCheck,
  AlertTriangle,
  Shield,
  TrendingUp,
  Star,
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
  Trash2,
  BookOpen,
  Target,
  Zap
} from 'lucide-react'

interface StudentProfile {
  id: string
  name: string
  email: string
  collegeId: string
  graduationYear: number
  department: string
  degree: string
  gpa: number
  status: 'active' | 'inactive' | 'graduated' | 'suspended'
  lastActive: string
  joinedDate: string
  phone?: string
  linkedin?: string
  bio?: string
  currentSemester: number
  totalCredits: number
  mentorRequests: number
  postsCount: number
  achievements: string[]
}

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentProfile[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterYear, setFilterYear] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState<string | null>(null)

  useEffect(() => {
    // Comprehensive mock students data
    setStudents([
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@university.edu',
        collegeId: 'STU2024-001',
        graduationYear: 2025,
        department: 'Computer Science',
        degree: 'Bachelor of Technology',
        gpa: 3.8,
        status: 'active',
        lastActive: '2024-01-16T10:30:00Z',
        joinedDate: '2023-08-15T00:00:00Z',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/johnsmith',
        bio: 'Passionate about web development and machine learning. Looking to gain industry experience.',
        currentSemester: 4,
        totalCredits: 60,
        mentorRequests: 3,
        postsCount: 12,
        achievements: ['Dean\'s List', 'Hackathon Winner']
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@university.edu',
        collegeId: 'STU2024-002',
        graduationYear: 2024,
        department: 'Business Administration',
        degree: 'Master of Business Administration',
        gpa: 3.9,
        status: 'active',
        lastActive: '2024-01-15T15:45:00Z',
        joinedDate: '2023-08-20T00:00:00Z',
        phone: '+1 (555) 234-5678',
        linkedin: 'linkedin.com/in/sarahwilson',
        bio: 'MBA student with focus on digital marketing and entrepreneurship.',
        currentSemester: 3,
        totalCredits: 45,
        mentorRequests: 5,
        postsCount: 8,
        achievements: ['Case Competition Winner', 'Leadership Award']
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@university.edu',
        collegeId: 'STU2024-003',
        graduationYear: 2026,
        department: 'Computer Science',
        degree: 'Bachelor of Technology',
        gpa: 3.6,
        status: 'active',
        lastActive: '2024-01-14T09:20:00Z',
        joinedDate: '2023-08-25T00:00:00Z',
        phone: '+1 (555) 345-6789',
        linkedin: 'linkedin.com/in/mikejohnson',
        bio: 'Full-stack developer with focus on React and Node.js. Want to learn about scaling applications.',
        currentSemester: 2,
        totalCredits: 30,
        mentorRequests: 2,
        postsCount: 15,
        achievements: ['Programming Contest Finalist']
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@university.edu',
        collegeId: 'STU2024-004',
        graduationYear: 2025,
        department: 'Mechanical Engineering',
        degree: 'Bachelor of Engineering',
        gpa: 3.7,
        status: 'active',
        lastActive: '2024-01-13T14:15:00Z',
        joinedDate: '2023-08-18T00:00:00Z',
        phone: '+1 (555) 456-7890',
        linkedin: 'linkedin.com/in/emilydavis',
        bio: 'Mechanical engineering student interested in renewable energy and sustainable design.',
        currentSemester: 4,
        totalCredits: 65,
        mentorRequests: 4,
        postsCount: 6,
        achievements: ['Engineering Design Award']
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@university.edu',
        collegeId: 'STU2024-005',
        graduationYear: 2024,
        department: 'Psychology',
        degree: 'Master of Science',
        gpa: 3.8,
        status: 'graduated',
        lastActive: '2024-01-12T11:30:00Z',
        joinedDate: '2022-08-15T00:00:00Z',
        phone: '+1 (555) 567-8901',
        linkedin: 'linkedin.com/in/davidbrown',
        bio: 'Psychology graduate student specializing in cognitive psychology and research methods.',
        currentSemester: 6,
        totalCredits: 90,
        mentorRequests: 1,
        postsCount: 20,
        achievements: ['Research Excellence Award', 'Thesis Defense Passed']
      },
      {
        id: '6',
        name: 'Lisa Garcia',
        email: 'lisa.garcia@university.edu',
        collegeId: 'STU2024-006',
        graduationYear: 2025,
        department: 'Electrical Engineering',
        degree: 'Bachelor of Engineering',
        gpa: 3.9,
        status: 'active',
        lastActive: '2024-01-16T08:45:00Z',
        joinedDate: '2023-08-22T00:00:00Z',
        phone: '+1 (555) 678-9012',
        linkedin: 'linkedin.com/in/lisagarcia',
        bio: 'Electrical engineering student with interest in power systems and renewable energy.',
        currentSemester: 3,
        totalCredits: 50,
        mentorRequests: 3,
        postsCount: 10,
        achievements: ['IEEE Student Member', 'Circuit Design Competition Winner']
      },
      {
        id: '7',
        name: 'James Wilson',
        email: 'james.wilson@university.edu',
        collegeId: 'STU2024-007',
        graduationYear: 2026,
        department: 'Computer Science',
        degree: 'Bachelor of Technology',
        gpa: 3.5,
        status: 'active',
        lastActive: '2024-01-15T16:20:00Z',
        joinedDate: '2023-08-28T00:00:00Z',
        phone: '+1 (555) 789-0123',
        linkedin: 'linkedin.com/in/jameswilson',
        bio: 'Computer science student passionate about artificial intelligence and machine learning.',
        currentSemester: 2,
        totalCredits: 28,
        mentorRequests: 2,
        postsCount: 18,
        achievements: ['AI Research Intern']
      },
      {
        id: '8',
        name: 'Maria Rodriguez',
        email: 'maria.rodriguez@university.edu',
        collegeId: 'STU2024-008',
        graduationYear: 2024,
        department: 'Finance',
        degree: 'Master of Science',
        gpa: 3.8,
        status: 'active',
        lastActive: '2024-01-14T12:30:00Z',
        joinedDate: '2022-08-20T00:00:00Z',
        phone: '+1 (555) 890-1234',
        linkedin: 'linkedin.com/in/mariarodriguez',
        bio: 'Finance graduate student with focus on investment analysis and risk management.',
        currentSemester: 4,
        totalCredits: 70,
        mentorRequests: 6,
        postsCount: 14,
        achievements: ['CFA Level 1 Passed', 'Investment Club President']
      },
      {
        id: '9',
        name: 'Alex Thompson',
        email: 'alex.thompson@university.edu',
        collegeId: 'STU2024-009',
        graduationYear: 2025,
        department: 'Biology',
        degree: 'Bachelor of Science',
        gpa: 3.7,
        status: 'active',
        lastActive: '2024-01-13T14:15:00Z',
        joinedDate: '2023-08-16T00:00:00Z',
        phone: '+1 (555) 901-2345',
        linkedin: 'linkedin.com/in/alexthompson',
        bio: 'Biology student interested in molecular biology and biotechnology research.',
        currentSemester: 4,
        totalCredits: 62,
        mentorRequests: 3,
        postsCount: 9,
        achievements: ['Research Assistant', 'Biology Club Secretary']
      },
      {
        id: '10',
        name: 'Rachel Lee',
        email: 'rachel.lee@university.edu',
        collegeId: 'STU2024-010',
        graduationYear: 2026,
        department: 'Marketing',
        degree: 'Bachelor of Business Administration',
        gpa: 3.6,
        status: 'active',
        lastActive: '2024-01-16T11:00:00Z',
        joinedDate: '2023-08-30T00:00:00Z',
        phone: '+1 (555) 012-3456',
        linkedin: 'linkedin.com/in/rachellee',
        bio: 'Marketing student with passion for digital marketing and brand management.',
        currentSemester: 2,
        totalCredits: 32,
        mentorRequests: 4,
        postsCount: 7,
        achievements: ['Marketing Campaign Winner']
      },
      {
        id: '11',
        name: 'Kevin Martinez',
        email: 'kevin.martinez@university.edu',
        collegeId: 'STU2024-011',
        graduationYear: 2024,
        department: 'Chemical Engineering',
        degree: 'Bachelor of Engineering',
        gpa: 3.8,
        status: 'suspended',
        lastActive: '2024-01-05T09:45:00Z',
        joinedDate: '2020-08-15T00:00:00Z',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/kevinmartinez',
        bio: 'Chemical engineering student with interest in process optimization and sustainability.',
        currentSemester: 8,
        totalCredits: 120,
        mentorRequests: 0,
        postsCount: 25,
        achievements: ['Academic Probation']
      },
      {
        id: '12',
        name: 'Jennifer White',
        email: 'jennifer.white@university.edu',
        collegeId: 'STU2024-012',
        graduationYear: 2025,
        department: 'Computer Science',
        degree: 'Master of Science',
        gpa: 3.9,
        status: 'active',
        lastActive: '2024-01-15T13:30:00Z',
        joinedDate: '2023-08-12T00:00:00Z',
        phone: '+1 (555) 234-5678',
        linkedin: 'linkedin.com/in/jenniferwhite',
        bio: 'Computer science graduate student specializing in cybersecurity and network security.',
        currentSemester: 3,
        totalCredits: 45,
        mentorRequests: 5,
        postsCount: 16,
        achievements: ['Cybersecurity Certification', 'Research Publication']
      },
      {
        id: '13',
        name: 'Robert Taylor',
        email: 'robert.taylor@university.edu',
        collegeId: 'STU2024-013',
        graduationYear: 2026,
        department: 'Physics',
        degree: 'Bachelor of Science',
        gpa: 3.7,
        status: 'active',
        lastActive: '2024-01-14T10:20:00Z',
        joinedDate: '2023-08-26T00:00:00Z',
        phone: '+1 (555) 345-6789',
        linkedin: 'linkedin.com/in/roberttaylor',
        bio: 'Physics student with interest in quantum mechanics and theoretical physics.',
        currentSemester: 2,
        totalCredits: 30,
        mentorRequests: 2,
        postsCount: 11,
        achievements: ['Physics Olympiad Participant']
      },
      {
        id: '14',
        name: 'Amanda Anderson',
        email: 'amanda.anderson@university.edu',
        collegeId: 'STU2024-014',
        graduationYear: 2024,
        department: 'Medicine',
        degree: 'Doctor of Medicine',
        gpa: 3.8,
        status: 'active',
        lastActive: '2024-01-16T15:45:00Z',
        joinedDate: '2020-08-15T00:00:00Z',
        phone: '+1 (555) 456-7890',
        linkedin: 'linkedin.com/in/amandaanderson',
        bio: 'Medical student with focus on internal medicine and patient care.',
        currentSemester: 8,
        totalCredits: 140,
        mentorRequests: 8,
        postsCount: 22,
        achievements: ['Medical Research Award', 'Clinical Excellence']
      },
      {
        id: '15',
        name: 'Daniel Kim',
        email: 'daniel.kim@university.edu',
        collegeId: 'STU2024-015',
        graduationYear: 2025,
        department: 'Architecture',
        degree: 'Bachelor of Architecture',
        gpa: 3.6,
        status: 'active',
        lastActive: '2024-01-11T16:30:00Z',
        joinedDate: '2023-08-14T00:00:00Z',
        phone: '+1 (555) 567-8901',
        linkedin: 'linkedin.com/in/danielkim',
        bio: 'Architecture student with passion for sustainable design and urban planning.',
        currentSemester: 4,
        totalCredits: 68,
        mentorRequests: 3,
        postsCount: 13,
        achievements: ['Design Competition Winner', 'Green Building Certification']
      }
    ])
  }, [])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.collegeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || student.department === filterDepartment
    const matchesYear = filterYear === 'all' || student.graduationYear.toString() === filterYear
    return matchesSearch && matchesStatus && matchesDepartment && matchesYear
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'graduated': return 'bg-blue-100 text-blue-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'inactive': return Clock
      case 'graduated': return Award
      case 'suspended': return X
      default: return Clock
    }
  }

  const handleViewProfile = (student: StudentProfile) => {
    setSelectedStudent(student)
    setShowProfileModal(true)
  }

  const departments = Array.from(new Set(students.map(s => s.department)))
  const graduationYears = Array.from(new Set(students.map(s => s.graduationYear))).sort((a, b) => a - b)

  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === 'active').length
  const graduatedStudents = students.filter(s => s.status === 'graduated').length
  const suspendedStudents = students.filter(s => s.status === 'suspended').length

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
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                    Student Management
                  </h1>
                  <p className="text-green-100 text-lg mt-2">Manage and monitor student profiles and academic progress</p>
                </div>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{activeStudents} Active</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{graduatedStudents} Graduated</span>
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
                  <span className="text-sm font-medium">+8% growth this semester</span>
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
                <p className="text-sm text-gray-600 font-medium">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalStudents}</p>
                <p className="text-xs text-gray-500 mt-1">All registered students</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Active</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeStudents}</p>
                <p className="text-xs text-gray-500 mt-1">Currently enrolled</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Graduated</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{graduatedStudents}</p>
                <p className="text-xs text-gray-500 mt-1">Completed programs</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Suspended</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{suspendedStudents}</p>
                <p className="text-xs text-gray-500 mt-1">Under review</p>
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
                  placeholder="Search students..."
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
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="graduated">Graduated</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
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

        {/* Enhanced Students Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-green-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Academic Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Progress
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
                {filteredStudents.map((student) => {
                  const StatusIcon = getStatusIcon(student.status)
                  return (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white text-sm font-bold">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                            <div className="text-xs text-gray-400">{student.collegeId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{student.degree}</div>
                        <div className="text-sm text-gray-500">{student.department}</div>
                        <div className="text-xs text-gray-400">GPA: {student.gpa}</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm text-gray-900 font-medium">Semester {student.currentSemester}</div>
                        <div className="text-sm text-gray-500">{student.totalCredits} credits</div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <Target className="w-3 h-3 mr-1" />
                          {student.mentorRequests} mentor requests
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                        {new Date(student.lastActive).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewProfile(student)}
                            className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-all duration-200"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => setShowUserMenu(showUserMenu === student.id ? null : student.id)}
                              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {showUserMenu === student.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                                <div className="py-1">
                                  <button
                                    onClick={() => {
                                      alert(`Send email to ${student.name}`)
                                      setShowUserMenu(null)
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Mail className="mr-3 h-4 w-4" />
                                    Send Email
                                  </button>
                                  <button
                                    onClick={() => {
                                      alert(`View academic records for ${student.name}`)
                                      setShowUserMenu(null)
                                    }}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <FileText className="mr-3 h-4 w-4" />
                                    Academic Records
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
        {showProfileModal && selectedStudent && (
          <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl bg-white/95 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Student Profile Details</h3>
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
                      <p className="text-gray-900 font-medium">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">College ID</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.collegeId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.linkedin || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.degree}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.department}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.graduationYear}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current GPA</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.gpa}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.currentSemester}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Credits</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.totalCredits}</p>
                    </div>
                  </div>
                </div>

                {/* Activity Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Activity & Engagement</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mentor Requests</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.mentorRequests}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Posts Created</label>
                      <p className="text-gray-900 font-medium">{selectedStudent.postsCount}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Joined Date</label>
                      <p className="text-gray-900 font-medium">{new Date(selectedStudent.joinedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Active</label>
                      <p className="text-gray-900 font-medium">{new Date(selectedStudent.lastActive).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                {selectedStudent.achievements.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.achievements.map((achievement, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <Award className="w-4 h-4 mr-1" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio */}
                {selectedStudent.bio && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Bio</h4>
                    <p className="text-gray-900 leading-relaxed">{selectedStudent.bio}</p>
                  </div>
                )}

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedStudent.status)}`}>
                      {(() => {
                        const StatusIcon = getStatusIcon(selectedStudent.status)
                        return <StatusIcon className="w-4 h-4 mr-1" />
                      })()}
                      {selectedStudent.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
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
