'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import CareerProgressModal from '@/components/CareerProgressModal'
import CareerTimeline from '@/components/CareerTimeline'
import { 
  TrendingUp, 
  Target, 
  Award, 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar,
  Building,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

export default function CareerProgress() {
  const { user, careerMilestones, careerGoals, skillProgress, careerProgress } = useStore()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'goals' | 'skills'>('overview')
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalType, setModalType] = useState<'milestone' | 'goal' | 'skill'>('milestone')
  const [editItem, setEditItem] = useState<any>(null)

  useEffect(() => {
    // Allow access even without authentication for demo purposes
    // if (!user || user.role !== 'alumni') {
    //   router.push('/')
    //   return
    // }
  }, [user, router])

  // Allow access even without authentication for demo purposes
  // if (!user || user.role !== 'alumni') {
  //   return null
  // }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      case 'paused': return 'text-yellow-600 bg-yellow-100'
      case 'not_started': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'promotion': return <TrendingUp className="w-5 h-5" />
      case 'job_change': return <Building className="w-5 h-5" />
      case 'certification': return <Award className="w-5 h-5" />
      case 'achievement': return <Star className="w-5 h-5" />
      case 'education': return <BookOpen className="w-5 h-5" />
      case 'project': return <Activity className="w-5 h-5" />
      case 'award': return <Award className="w-5 h-5" />
      default: return <Award className="w-5 h-5" />
    }
  }

  const getGoalIcon = (category: string) => {
    switch (category) {
      case 'career_advancement': return <TrendingUp className="w-5 h-5" />
      case 'skill_development': return <BookOpen className="w-5 h-5" />
      case 'networking': return <Activity className="w-5 h-5" />
      case 'education': return <BookOpen className="w-5 h-5" />
      case 'leadership': return <Star className="w-5 h-5" />
      case 'entrepreneurship': return <Building className="w-5 h-5" />
      default: return <Target className="w-5 h-5" />
    }
  }

  const getSkillCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Activity className="w-5 h-5" />
      case 'soft': return <Star className="w-5 h-5" />
      case 'leadership': return <TrendingUp className="w-5 h-5" />
      case 'domain': return <BookOpen className="w-5 h-5" />
      default: return <BookOpen className="w-5 h-5" />
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Milestones</p>
              <p className="text-3xl font-bold text-gray-900">{careerMilestones.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Goals</p>
              <p className="text-3xl font-bold text-gray-900">
                {careerGoals.filter(goal => goal.status === 'in_progress').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Skills Tracked</p>
              <p className="text-3xl font-bold text-gray-900">{skillProgress.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Years Experience</p>
              <p className="text-3xl font-bold text-gray-900">{careerProgress?.yearsOfExperience || 0}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Milestones */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Milestones</h3>
            <button 
              onClick={() => {
                setModalType('milestone')
                setShowAddModal(true)
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add Milestone
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {careerMilestones.slice(0, 3).map((milestone) => (
              <div key={milestone.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {getMilestoneIcon(milestone.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500">{formatDate(milestone.date)}</span>
                    {milestone.company && (
                      <span className="text-xs text-gray-500">• {milestone.company}</span>
                    )}
                    {milestone.position && (
                      <span className="text-xs text-gray-500">• {milestone.position}</span>
                    )}
                  </div>
                  {milestone.skills && milestone.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {milestone.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                      {milestone.skills.length > 3 && (
                        <span className="text-xs text-gray-500">+{milestone.skills.length - 3} more</span>
                      )}
                    </div>
                  )}
                  {milestone.impact && (
                    <p className="text-xs text-green-600 mt-1 font-medium">Impact: {milestone.impact}</p>
                  )}
                  {milestone.evidence && (
                    <a 
                      href={milestone.evidence} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 mt-1 block"
                    >
                      View Evidence →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Goals */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
            <button 
              onClick={() => {
                setModalType('goal')
                setShowAddModal(true)
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Add Goal
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {careerGoals.filter(goal => goal.status === 'in_progress').slice(0, 3).map((goal) => (
              <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                      {getGoalIcon(goal.category)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">Target: {formatDate(goal.targetDate)}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(goal.priority)}`}>
                          {goal.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{goal.progress}%</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Timeline */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Career Timeline</h3>
            <button 
              onClick={() => setActiveTab('milestones')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Milestones
            </button>
          </div>
        </div>
        <div className="p-6">
          <CareerTimeline milestones={careerMilestones.slice(0, 5)} />
        </div>
      </div>
    </div>
  )

  const renderMilestones = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Career Milestones</h2>
        <button 
          onClick={() => {
            setModalType('milestone')
            setShowAddModal(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline View</h3>
        <CareerTimeline milestones={careerMilestones} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {careerMilestones.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No milestones yet</h3>
            <p className="text-gray-600 mb-4">Start tracking your career achievements by adding your first milestone!</p>
            <button 
              onClick={() => {
                setModalType('milestone')
                setShowAddModal(true)
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Your First Milestone
            </button>
          </div>
        ) : (
          careerMilestones.map((milestone) => (
          <div key={milestone.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {getMilestoneIcon(milestone.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600 mt-1">{milestone.description}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{formatDate(milestone.date)}</span>
                    </div>
                    {milestone.company && (
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{milestone.company}</span>
                      </div>
                    )}
                    {milestone.position && (
                      <span className="text-sm text-gray-600">• {milestone.position}</span>
                    )}
                  </div>
                  {milestone.skills && milestone.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {milestone.skills.map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  {milestone.impact && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Impact:</strong> {milestone.impact}
                      </p>
                    </div>
                  )}
                  {milestone.evidence && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800 mb-2">
                        <strong>Evidence:</strong>
                      </p>
                      <a 
                        href={milestone.evidence} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        {milestone.evidence}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setEditItem(milestone)
                    setModalType('milestone')
                    setShowAddModal(true)
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  )

  const renderGoals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Career Goals</h2>
        <button 
          onClick={() => {
            setModalType('goal')
            setShowAddModal(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {careerGoals.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
            <p className="text-gray-600 mb-4">Set your first career goal to start tracking your progress!</p>
            <button 
              onClick={() => {
                setModalType('goal')
                setShowAddModal(true)
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Your First Goal
            </button>
          </div>
        ) : (
          careerGoals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  {getGoalIcon(goal.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                      {goal.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                      {goal.priority} priority
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{goal.description}</p>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Target: {formatDate(goal.targetDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Updated: {formatDate(goal.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setEditItem(goal)
                    setModalType('goal')
                    setShowAddModal(true)
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  )

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Skill Development</h2>
        <button 
          onClick={() => {
            setModalType('skill')
            setShowAddModal(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillProgress.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No skills tracked yet</h3>
            <p className="text-gray-600 mb-4">Start tracking your skill development by adding your first skill!</p>
            <button 
              onClick={() => {
                setModalType('skill')
                setShowAddModal(true)
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Your First Skill
            </button>
          </div>
        ) : (
          skillProgress.map((skill) => (
          <div key={skill.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  {getSkillCategoryIcon(skill.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{skill.skillName}</h3>
                  <p className="text-sm text-gray-600 capitalize">{skill.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setEditItem(skill)
                    setModalType('skill')
                    setShowAddModal(true)
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Current Level</span>
                  <span className="text-sm font-medium text-gray-900">{skill.currentLevel}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(skill.currentLevel / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Target Level</span>
                  <span className="text-sm font-medium text-gray-900">{skill.targetLevel}/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(skill.targetLevel / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500">Last updated: {formatDate(skill.lastUpdated)}</p>
              </div>

              {skill.learningResources && skill.learningResources.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Learning Resources</p>
                  <div className="space-y-1">
                    {skill.learningResources.map((resource, index) => (
                      <p key={index} className="text-xs text-gray-600">• {resource}</p>
                    ))}
                  </div>
                </div>
              )}

              {skill.certifications && skill.certifications.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Certifications</p>
                  <div className="space-y-1">
                    {skill.certifications.map((cert, index) => (
                      <p key={index} className="text-xs text-gray-600">• {cert}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="alumni" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Career Progress Tracking</h1>
          <p className="text-gray-600 mt-2">Track your professional growth, set goals, and celebrate achievements</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'milestones', label: 'Milestones', icon: Award },
                { id: 'goals', label: 'Goals', icon: Target },
                { id: 'skills', label: 'Skills', icon: BookOpen }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'milestones' && renderMilestones()}
        {activeTab === 'goals' && renderGoals()}
        {activeTab === 'skills' && renderSkills()}
      </div>

      {/* Modal */}
      <CareerProgressModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          setEditItem(null)
        }}
        type={modalType}
        editItem={editItem}
      />
    </div>
  )
}
