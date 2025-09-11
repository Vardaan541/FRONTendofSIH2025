'use client'

import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, Lock, User, Mail, Phone, MapPin, Calendar, Building, Briefcase, GraduationCap } from 'lucide-react'

interface SignupFormProps {
  role: 'student' | 'alumni'
  onBack: () => void
  onSignup: (userData: SignupData) => void
  isLoading: boolean
}

export interface SignupData {
  // Common fields
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  department: string
  bio: string
  dateOfBirth?: string
  gender?: string
  location?: string
  interests?: string[]
  profileImage?: string
  
  // Student specific
  studentId?: string
  currentSemester?: string
  cgpa?: number
  projects?: string[]
  achievements?: string[]
  socialLinks?: {
    github?: string
    linkedin?: string
    portfolio?: string
  }
  
  // Alumni specific
  graduationYear?: number
  currentPosition?: string
  company?: string
  experience?: number
  linkedinProfile?: string
  skills?: string[]
  hourlyRate?: number
  availability?: string[]
  mentoringAreas?: string[]
  education?: {
    degree: string
    institution: string
    year: number
  }[]
  workExperience?: {
    company: string
    position: string
    duration: string
    description: string
  }[]
}

export default function SignupForm({ role, onBack, onSignup, isLoading }: SignupFormProps) {
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    bio: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    interests: [],
    profileImage: '',
    studentId: '',
    graduationYear: new Date().getFullYear(),
    currentSemester: '',
    cgpa: 0,
    projects: [],
    achievements: [],
    socialLinks: {
      github: '',
      linkedin: '',
      portfolio: ''
    },
    currentPosition: '',
    company: '',
    experience: 0,
    linkedinProfile: '',
    skills: [],
    hourlyRate: 50,
    availability: [],
    mentoringAreas: [],
    education: [],
    workExperience: []
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [skillsInput, setSkillsInput] = useState('')

  const totalSteps = role === 'student' ? 5 : 6

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }
    
    if (step === 2) {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      }
      if (!formData.department.trim()) {
        newErrors.department = 'Department is required'
      }
      if (role === 'student') {
        if (!formData.studentId?.trim()) {
          newErrors.studentId = 'Student ID is required'
        }
        if (!formData.currentSemester?.trim()) {
          newErrors.currentSemester = 'Current semester is required'
        }
      }
    }
    
    if (step === 3 && role === 'alumni') {
      if (!formData.currentPosition?.trim()) {
        newErrors.currentPosition = 'Current position is required'
      }
      if (!formData.company?.trim()) {
        newErrors.company = 'Company is required'
      }
      if (!formData.experience || formData.experience < 0) {
        newErrors.experience = 'Experience years is required'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(currentStep)) {
      onSignup(formData)
    }
  }

  const addSkill = () => {
    if (skillsInput.trim() && !formData.skills?.includes(skillsInput.trim())) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), skillsInput.trim()]
      })
      setSkillsInput('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills?.filter(skill => skill !== skillToRemove) || []
    })
  }

  const addProject = () => {
    if (skillsInput.trim() && !formData.projects?.includes(skillsInput.trim())) {
      setFormData({
        ...formData,
        projects: [...(formData.projects || []), skillsInput.trim()]
      })
      setSkillsInput('')
    }
  }

  const removeProject = (projectToRemove: string) => {
    setFormData({
      ...formData,
      projects: formData.projects?.filter(project => project !== projectToRemove) || []
    })
  }

  const addAchievement = () => {
    if (skillsInput.trim() && !formData.achievements?.includes(skillsInput.trim())) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), skillsInput.trim()]
      })
      setSkillsInput('')
    }
  }

  const removeAchievement = (achievementToRemove: string) => {
    setFormData({
      ...formData,
      achievements: formData.achievements?.filter(achievement => achievement !== achievementToRemove) || []
    })
  }

  const addMentoringArea = () => {
    if (skillsInput.trim() && !formData.mentoringAreas?.includes(skillsInput.trim())) {
      setFormData({
        ...formData,
        mentoringAreas: [...(formData.mentoringAreas || []), skillsInput.trim()]
      })
      setSkillsInput('')
    }
  }

  const removeMentoringArea = (areaToRemove: string) => {
    setFormData({
      ...formData,
      mentoringAreas: formData.mentoringAreas?.filter(area => area !== areaToRemove) || []
    })
  }

  const getRoleInfo = () => {
    return role === 'student' 
      ? {
          title: 'Student Registration',
          subtitle: 'Join our student community',
          icon: '🎓',
          color: 'blue'
        }
      : {
          title: 'Alumni Registration',
          subtitle: 'Connect with your alma mater',
          icon: '👨‍💼',
          color: 'green'
        }
  }

  const roleInfo = getRoleInfo()

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
      
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`input-enhanced pl-10 ${errors.name ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
            placeholder="Enter your full name"
            disabled={isLoading}
          />
        </div>
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`input-enhanced pl-10 ${errors.email ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
            placeholder="Enter your email"
            disabled={isLoading}
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`input-enhanced pl-10 pr-12 ${errors.password ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
            placeholder="Create a password"
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`input-enhanced pl-10 pr-12 ${errors.confirmPassword ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Academic Information</h3>
      
      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`input-enhanced pl-10 ${errors.phone ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
            placeholder="Enter your phone number"
            disabled={isLoading}
          />
        </div>
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* Department Field */}
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
          Department
        </label>
        <select
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          className={`input-enhanced ${errors.department ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
          disabled={isLoading}
        >
          <option value="">Select your department</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electronics & Communication">Electronics & Communication</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Business Administration">Business Administration</option>
          <option value="Other">Other</option>
        </select>
        {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
      </div>

      {role === 'student' ? (
        <>
          {/* Student ID Field */}
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
              Student ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GraduationCap className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="studentId"
                type="text"
                value={formData.studentId || ''}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className={`input-enhanced pl-10 ${errors.studentId ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
                placeholder="Enter your student ID"
                disabled={isLoading}
              />
            </div>
            {errors.studentId && <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>}
          </div>

          {/* Current Semester Field */}
          <div>
            <label htmlFor="currentSemester" className="block text-sm font-medium text-gray-700 mb-2">
              Current Semester
            </label>
            <select
              id="currentSemester"
              value={formData.currentSemester || ''}
              onChange={(e) => setFormData({ ...formData, currentSemester: e.target.value })}
              className={`input-enhanced ${errors.currentSemester ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
              disabled={isLoading}
            >
              <option value="">Select current semester</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
              <option value="7th Semester">7th Semester</option>
              <option value="8th Semester">8th Semester</option>
            </select>
            {errors.currentSemester && <p className="mt-1 text-sm text-red-600">{errors.currentSemester}</p>}
          </div>
        </>
      ) : (
        /* Alumni Graduation Year */
        <div>
          <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
            Graduation Year
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="graduationYear"
              type="number"
              min="1990"
              max={new Date().getFullYear()}
              value={formData.graduationYear || ''}
              onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
              className="input-enhanced pl-10"
              placeholder="Enter graduation year"
              disabled={isLoading}
            />
          </div>
        </div>
      )}

      {/* Bio Field */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="input-enhanced"
          rows={3}
          placeholder="Tell us about yourself..."
          disabled={isLoading}
        />
      </div>

      {/* Date of Birth Field */}
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth || ''}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          className="input-enhanced"
          disabled={isLoading}
        />
      </div>

      {/* Gender Field */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>
        <select
          id="gender"
          value={formData.gender || ''}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="input-enhanced"
          disabled={isLoading}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      {/* Location Field */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          id="location"
          type="text"
          value={formData.location || ''}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="input-enhanced"
          placeholder="City, State, Country"
          disabled={isLoading}
        />
      </div>
    </div>
  )

  const renderStep3 = () => {
    if (role === 'student') {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
          
          {/* CGPA Field */}
          <div>
            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700 mb-2">
              Current CGPA
            </label>
            <input
              id="cgpa"
              type="number"
              min="0"
              max="10"
              step="0.01"
              value={formData.cgpa || ''}
              onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
              className="input-enhanced"
              placeholder="Enter your current CGPA"
              disabled={isLoading}
            />
          </div>

          {/* Graduation Year for Students */}
          <div>
            <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-2">
              Expected Graduation Year
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="graduationYear"
                type="number"
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 10}
                value={formData.graduationYear || ''}
                onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                className="input-enhanced pl-10"
                placeholder="Enter expected graduation year"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
        
        {/* Current Position Field */}
        <div>
          <label htmlFor="currentPosition" className="block text-sm font-medium text-gray-700 mb-2">
            Current Position
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="currentPosition"
              type="text"
              value={formData.currentPosition || ''}
              onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
              className={`input-enhanced pl-10 ${errors.currentPosition ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
              placeholder="e.g., Software Engineer, Product Manager"
              disabled={isLoading}
            />
          </div>
          {errors.currentPosition && <p className="mt-1 text-sm text-red-600">{errors.currentPosition}</p>}
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="company"
              type="text"
              value={formData.company || ''}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className={`input-enhanced pl-10 ${errors.company ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
              placeholder="Enter your company name"
              disabled={isLoading}
            />
          </div>
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
        </div>

        {/* Experience Field */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <input
            id="experience"
            type="number"
            min="0"
            max="50"
            value={formData.experience || ''}
            onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
            className={`input-enhanced ${errors.experience ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
            placeholder="Enter years of experience"
            disabled={isLoading}
          />
          {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
        </div>

        {/* LinkedIn Profile Field */}
        <div>
          <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile (Optional)
          </label>
          <input
            id="linkedinProfile"
            type="url"
            value={formData.linkedinProfile || ''}
            onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
            className="input-enhanced"
            placeholder="https://linkedin.com/in/yourprofile"
            disabled={isLoading}
          />
        </div>
      </div>
    )
  }

  const renderStep4 = () => {
    if (role === 'student') {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects & Achievements</h3>
          
          {/* Projects Input */}
          <div>
            <label htmlFor="projects" className="block text-sm font-medium text-gray-700 mb-2">
              Projects
            </label>
            <div className="flex space-x-2">
              <input
                id="projects"
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                className="input-enhanced flex-1"
                placeholder="Add a project (e.g., E-commerce Website, Mobile App)"
                disabled={isLoading}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProject())}
              />
              <button
                type="button"
                onClick={addProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                Add
              </button>
            </div>
            
            {/* Projects Display */}
            {formData.projects && formData.projects.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.projects.map((project, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {project}
                    <button
                      type="button"
                      onClick={() => removeProject(project)}
                      className="ml-2 text-green-600 hover:text-green-800"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Achievements Input */}
          <div>
            <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-2">
              Achievements
            </label>
            <div className="flex space-x-2">
              <input
                id="achievements"
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                className="input-enhanced flex-1"
                placeholder="Add an achievement (e.g., Hackathon Winner, Scholarship)"
                disabled={isLoading}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
              />
              <button
                type="button"
                onClick={addAchievement}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                disabled={isLoading}
              >
                Add
              </button>
            </div>
            
            {/* Achievements Display */}
            {formData.achievements && formData.achievements.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.achievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                  >
                    {achievement}
                    <button
                      type="button"
                      onClick={() => removeAchievement(achievement)}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Interests</h3>
        
        {/* Skills Input */}
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <div className="flex space-x-2">
            <input
              id="skills"
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="input-enhanced flex-1"
              placeholder="Add a skill (e.g., JavaScript, Python, Leadership)"
              disabled={isLoading}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isLoading}
            >
              Add
            </button>
          </div>
          
          {/* Skills Display */}
          {formData.skills && formData.skills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                    disabled={isLoading}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderStep5 = () => {
    if (role === 'student') {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links & Interests</h3>
          
          {/* Social Links */}
          <div className="space-y-4">
            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Profile
              </label>
              <input
                id="github"
                type="url"
                value={formData.socialLinks?.github || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, github: e.target.value }
                })}
                className="input-enhanced"
                placeholder="https://github.com/yourusername"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile
              </label>
              <input
                id="linkedin"
                type="url"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                })}
                className="input-enhanced"
                placeholder="https://linkedin.com/in/yourprofile"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio Website
              </label>
              <input
                id="portfolio"
                type="url"
                value={formData.socialLinks?.portfolio || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, portfolio: e.target.value }
                })}
                className="input-enhanced"
                placeholder="https://yourportfolio.com"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentoring Preferences</h3>
        
        {/* Hourly Rate */}
        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
            Hourly Rate (₹)
          </label>
          <input
            id="hourlyRate"
            type="number"
            min="100"
            max="5000"
            value={formData.hourlyRate || ''}
            onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) })}
            className="input-enhanced"
            placeholder="Enter your hourly rate"
            disabled={isLoading}
          />
        </div>

        {/* Mentoring Areas */}
        <div>
          <label htmlFor="mentoringAreas" className="block text-sm font-medium text-gray-700 mb-2">
            Mentoring Areas
          </label>
          <div className="flex space-x-2">
            <input
              id="mentoringAreas"
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="input-enhanced flex-1"
              placeholder="Add mentoring area (e.g., Career Guidance, Technical Skills)"
              disabled={isLoading}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMentoringArea())}
            />
            <button
              type="button"
              onClick={addMentoringArea}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              disabled={isLoading}
            >
              Add
            </button>
          </div>
          
          {/* Mentoring Areas Display */}
          {formData.mentoringAreas && formData.mentoringAreas.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.mentoringAreas.map((area, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {area}
                  <button
                    type="button"
                    onClick={() => removeMentoringArea(area)}
                    className="ml-2 text-green-600 hover:text-green-800"
                    disabled={isLoading}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderStep6 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Final Review</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Profile Summary</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Department:</strong> {formData.department}</p>
          {formData.location && <p><strong>Location:</strong> {formData.location}</p>}
          {role === 'student' && formData.studentId && <p><strong>Student ID:</strong> {formData.studentId}</p>}
          {role === 'alumni' && formData.company && <p><strong>Company:</strong> {formData.company}</p>}
          {formData.skills && formData.skills.length > 0 && (
            <p><strong>Skills:</strong> {formData.skills.join(', ')}</p>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Role Selection</span>
        </button>

        {/* Signup Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-r ${
              roleInfo.color === 'blue' ? 'from-blue-500 to-blue-600' : 'from-green-500 to-green-600'
            } rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-2xl">{roleInfo.icon}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{roleInfo.title}</h1>
            <p className="text-gray-600">{roleInfo.subtitle}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  roleInfo.color === 'blue' ? 'bg-blue-600' : 'bg-green-600'
                }`}
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isLoading}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                    roleInfo.color === 'blue' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : roleInfo.color === 'blue' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onBack}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
