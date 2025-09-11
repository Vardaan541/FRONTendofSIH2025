'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import RazorpayPayment from './RazorpayPayment'
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  GraduationCap,
  Briefcase,
  MessageCircle,
  CheckCircle,
  X
} from 'lucide-react'

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

interface SessionBookingFormProps {
  alumni: Alumni
  isOpen: boolean
  onClose: () => void
}

interface BookingData {
  // Session details
  sessionHours: number
  sessionDate: string
  sessionTime: string
  message: string
  
  // Student profile information (collected during booking)
  studentName: string
  studentEmail: string
  studentPhone: string
  studentId: string
  department: string
  currentSemester: string
  graduationYear: number
  bio: string
  
  // Additional information
  goals: string
  expectations: string
  preferredCommunication: string
  previousExperience: string
}

export default function SessionBookingForm({ alumni, isOpen, onClose }: SessionBookingFormProps) {
  const { user } = useStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [orderId, setOrderId] = useState('')
  
  const [bookingData, setBookingData] = useState<BookingData>({
    sessionHours: 1,
    sessionDate: '',
    sessionTime: '',
    message: '',
    studentName: user?.name || '',
    studentEmail: user?.email || '',
    studentPhone: '',
    studentId: '',
    department: '',
    currentSemester: '',
    graduationYear: new Date().getFullYear() + 2,
    bio: '',
    goals: '',
    expectations: '',
    preferredCommunication: 'video',
    previousExperience: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 4

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!bookingData.sessionDate) {
        newErrors.sessionDate = 'Session date is required'
      } else if (new Date(bookingData.sessionDate) < new Date()) {
        newErrors.sessionDate = 'Session date cannot be in the past'
      }
      if (!bookingData.sessionTime) {
        newErrors.sessionTime = 'Session time is required'
      }
      if (bookingData.sessionHours < 1 || bookingData.sessionHours > 8) {
        newErrors.sessionHours = 'Session duration must be between 1 and 8 hours'
      }
    }
    
    if (step === 2) {
      if (!bookingData.studentName.trim()) {
        newErrors.studentName = 'Name is required'
      }
      if (!bookingData.studentEmail.trim()) {
        newErrors.studentEmail = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(bookingData.studentEmail)) {
        newErrors.studentEmail = 'Please enter a valid email'
      }
      if (!bookingData.studentPhone.trim()) {
        newErrors.studentPhone = 'Phone number is required'
      }
      if (!bookingData.studentId.trim()) {
        newErrors.studentId = 'Student ID is required'
      }
      if (!bookingData.department.trim()) {
        newErrors.department = 'Department is required'
      }
      if (!bookingData.currentSemester.trim()) {
        newErrors.currentSemester = 'Current semester is required'
      }
    }
    
    if (step === 3) {
      if (!bookingData.goals.trim()) {
        newErrors.goals = 'Please describe your goals for this session'
      }
      if (!bookingData.expectations.trim()) {
        newErrors.expectations = 'Please describe your expectations'
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

  const handleInputChange = (field: keyof BookingData, value: string | number) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const createOrder = async () => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: alumni.hourlyRate * bookingData.sessionHours,
          currency: 'INR',
          studentId: user?.id,
          alumniId: alumni.id,
          sessionData: bookingData
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const data = await response.json()
      return data.orderId
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

  const handleProceedToPayment = async () => {
    if (!validateStep(currentStep)) return
    
    setIsProcessingPayment(true)
    try {
      const orderId = await createOrder()
      setOrderId(orderId)
      setShowPayment(true)
    } catch (error) {
      alert('Failed to initialize payment. Please try again.')
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const handlePaymentSuccess = async (paymentId: string, signature: string) => {
    try {
      // Here you would typically save the booking to your database
      console.log('Payment successful:', { paymentId, signature, bookingData })
      
      // Show success message
      alert(`Session booking confirmed! Payment ID: ${paymentId}`)
      
      // Close the modal
      onClose()
    } catch (error) {
      console.error('Error processing payment success:', error)
      alert('Payment successful but there was an error saving your booking. Please contact support.')
    }
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error)
    alert(`Payment failed: ${error}`)
    setShowPayment(false)
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Session Date
          </label>
          <input
            type="date"
            value={bookingData.sessionDate}
            onChange={(e) => handleInputChange('sessionDate', e.target.value)}
            className={`input-enhanced ${
              errors.sessionDate ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
            }`}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.sessionDate && <p className="mt-1 text-sm text-red-600">{errors.sessionDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Session Time
          </label>
          <input
            type="time"
            value={bookingData.sessionTime}
            onChange={(e) => handleInputChange('sessionTime', e.target.value)}
            className={`input-enhanced ${
              errors.sessionTime ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
            }`}
          />
          {errors.sessionTime && <p className="mt-1 text-sm text-red-600">{errors.sessionTime}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock className="w-4 h-4 inline mr-1" />
          Session Duration (Hours)
        </label>
        <input
          type="number"
          min="1"
          max="8"
          value={bookingData.sessionHours}
          onChange={(e) => handleInputChange('sessionHours', parseInt(e.target.value) || 1)}
          className={`input-enhanced ${
            errors.sessionHours ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
          }`}
        />
        {errors.sessionHours && <p className="mt-1 text-sm text-red-600">{errors.sessionHours}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageCircle className="w-4 h-4 inline mr-1" />
          Message to Alumni (Optional)
        </label>
        <textarea
          value={bookingData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          rows={3}
          className="textarea-enhanced"
          placeholder="What would you like to discuss in this session?"
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-medium text-blue-900 mb-2">Session Summary</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <div className="flex justify-between">
            <span>Alumni:</span>
            <span>{alumni.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Rate per hour:</span>
            <span>₹{alumni.hourlyRate}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span>{bookingData.sessionHours} hour(s)</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 mt-2">
            <span>Total Cost:</span>
            <span>₹{alumni.hourlyRate * bookingData.sessionHours}</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Full Name
          </label>
          <input
            type="text"
            value={bookingData.studentName}
            onChange={(e) => handleInputChange('studentName', e.target.value)}
            className={`input-enhanced ${
              errors.studentName ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
            }`}
            placeholder="Enter your full name"
          />
          {errors.studentName && <p className="mt-1 text-sm text-red-600">{errors.studentName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-1" />
            Email Address
          </label>
          <input
            type="email"
            value={bookingData.studentEmail}
            onChange={(e) => handleInputChange('studentEmail', e.target.value)}
            className={`input-enhanced ${
              errors.studentEmail ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
            }`}
            placeholder="Enter your email"
          />
          {errors.studentEmail && <p className="mt-1 text-sm text-red-600">{errors.studentEmail}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            value={bookingData.studentPhone}
            onChange={(e) => handleInputChange('studentPhone', e.target.value)}
            className={`input-enhanced ${
              errors.studentPhone ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
            }`}
            placeholder="Enter your phone number"
          />
          {errors.studentPhone && <p className="mt-1 text-sm text-red-600">{errors.studentPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="w-4 h-4 inline mr-1" />
            Student ID
          </label>
          <input
            type="text"
            value={bookingData.studentId}
            onChange={(e) => handleInputChange('studentId', e.target.value)}
            className={`input-enhanced ${
              errors.studentId ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
            }`}
            placeholder="Enter your student ID"
          />
          {errors.studentId && <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building className="w-4 h-4 inline mr-1" />
            Department
          </label>
          <select
            value={bookingData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className={`select-enhanced ${
              errors.department ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
            }`}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="w-4 h-4 inline mr-1" />
            Current Semester
          </label>
          <select
            value={bookingData.currentSemester}
            onChange={(e) => handleInputChange('currentSemester', e.target.value)}
            className={`select-enhanced ${
              errors.currentSemester ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
            }`}
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <GraduationCap className="w-4 h-4 inline mr-1" />
          Expected Graduation Year
        </label>
        <input
          type="number"
          min={new Date().getFullYear()}
          max={new Date().getFullYear() + 10}
          value={bookingData.graduationYear}
          onChange={(e) => handleInputChange('graduationYear', parseInt(e.target.value) || new Date().getFullYear() + 2)}
          className="input-enhanced"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <User className="w-4 h-4 inline mr-1" />
          Bio
        </label>
        <textarea
          value={bookingData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          rows={3}
          className="textarea-enhanced"
          placeholder="Tell us about yourself, your interests, and career goals..."
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Goals & Expectations</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="w-4 h-4 inline mr-1" />
          What are your goals for this session?
        </label>
        <textarea
          value={bookingData.goals}
          onChange={(e) => handleInputChange('goals', e.target.value)}
          rows={4}
          className={`textarea-enhanced ${
            errors.goals ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
          }`}
          placeholder="e.g., Career guidance, technical skills development, interview preparation, networking advice..."
        />
        {errors.goals && <p className="mt-1 text-sm text-red-600">{errors.goals}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageCircle className="w-4 h-4 inline mr-1" />
          What do you expect from this mentoring session?
        </label>
        <textarea
          value={bookingData.expectations}
          onChange={(e) => handleInputChange('expectations', e.target.value)}
          rows={4}
          className={`textarea-enhanced ${
            errors.expectations ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''
          }`}
          placeholder="e.g., Specific advice on career path, technical knowledge sharing, industry insights..."
        />
        {errors.expectations && <p className="mt-1 text-sm text-red-600">{errors.expectations}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageCircle className="w-4 h-4 inline mr-1" />
          Preferred Communication Method
        </label>
        <select
          value={bookingData.preferredCommunication}
          onChange={(e) => handleInputChange('preferredCommunication', e.target.value)}
          className="select-enhanced"
        >
          <option value="video">Video Call</option>
          <option value="audio">Audio Call</option>
          <option value="chat">Text Chat</option>
          <option value="in-person">In-Person Meeting</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="w-4 h-4 inline mr-1" />
          Previous Mentoring Experience (Optional)
        </label>
        <textarea
          value={bookingData.previousExperience}
          onChange={(e) => handleInputChange('previousExperience', e.target.value)}
          rows={3}
          className="textarea-enhanced"
          placeholder="Have you had mentoring sessions before? What worked well or didn't work?"
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Review & Payment</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-4">Session Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Alumni:</span>
            <span className="font-medium">{alumni.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Position:</span>
            <span className="font-medium">{alumni.currentPosition}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Company:</span>
            <span className="font-medium">{alumni.company}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{bookingData.sessionDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{bookingData.sessionTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{bookingData.sessionHours} hour(s)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rate per hour:</span>
            <span className="font-medium">₹{alumni.hourlyRate}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="text-gray-900 font-semibold">Total Amount:</span>
            <span className="text-gray-900 font-semibold">₹{alumni.hourlyRate * bookingData.sessionHours}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Your Information</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <div><strong>Name:</strong> {bookingData.studentName}</div>
          <div><strong>Email:</strong> {bookingData.studentEmail}</div>
          <div><strong>Phone:</strong> {bookingData.studentPhone}</div>
          <div><strong>Student ID:</strong> {bookingData.studentId}</div>
          <div><strong>Department:</strong> {bookingData.department}</div>
          <div><strong>Semester:</strong> {bookingData.currentSemester}</div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">Session Goals</h4>
        <p className="text-sm text-green-800">{bookingData.goals}</p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-medium text-yellow-900 mb-2">Expectations</h4>
        <p className="text-sm text-yellow-800">{bookingData.expectations}</p>
      </div>
    </div>
  )

  if (!isOpen) return null

  if (showPayment) {
    return (
      <RazorpayPayment
        amount={alumni.hourlyRate * bookingData.sessionHours}
        orderId={orderId}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        onClose={() => setShowPayment(false)}
        studentName={bookingData.studentName}
        alumniName={alumni.name}
        sessionHours={bookingData.sessionHours}
        hourlyRate={alumni.hourlyRate}
      />
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Book Session with {alumni.name}
              </h2>
              <p className="text-gray-600">
                {alumni.currentPosition} at {alumni.company}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleProceedToPayment}
                disabled={isProcessingPayment}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4" />
                    <span>Proceed to Payment</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
