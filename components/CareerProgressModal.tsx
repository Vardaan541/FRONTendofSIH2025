'use client'

import { useState, useEffect } from 'react'
import { useStore, CareerMilestone, CareerGoal, SkillProgress } from '@/lib/store'
import { X, Calendar, Building, Award, Target, BookOpen, Star, Activity, TrendingUp } from 'lucide-react'

interface CareerProgressModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'milestone' | 'goal' | 'skill'
  editItem?: CareerMilestone | CareerGoal | SkillProgress | null
}

export default function CareerProgressModal({ isOpen, onClose, type, editItem }: CareerProgressModalProps) {
  const { user, addCareerMilestone, addCareerGoal, addSkillProgress, updateCareerMilestone, updateCareerGoal, updateSkillProgress } = useStore()
  
  const [formData, setFormData] = useState({
    // Milestone fields
    title: '',
    description: '',
    type: 'promotion' as CareerMilestone['type'],
    date: '',
    company: '',
    position: '',
    skills: '',
    impact: '',
    evidence: '',
    
    // Goal fields
    category: 'career_advancement' as CareerGoal['category'],
    targetDate: '',
    status: 'not_started' as CareerGoal['status'],
    priority: 'medium' as CareerGoal['priority'],
    progress: 0,
    
    // Skill fields
    skillName: '',
    skillCategory: 'technical' as SkillProgress['category'],
    currentLevel: 1,
    targetLevel: 1,
    learningResources: '',
    certifications: ''
  })

  useEffect(() => {
    if (editItem) {
      if (type === 'milestone') {
        const milestone = editItem as CareerMilestone
        setFormData({
          ...formData,
          title: milestone.title,
          description: milestone.description,
          type: milestone.type,
          date: milestone.date.toISOString().split('T')[0],
          company: milestone.company || '',
          position: milestone.position || '',
          skills: milestone.skills?.join(', ') || '',
          impact: milestone.impact || '',
          evidence: milestone.evidence || ''
        })
      } else if (type === 'goal') {
        const goal = editItem as CareerGoal
        setFormData({
          ...formData,
          title: goal.title,
          description: goal.description,
          category: goal.category,
          targetDate: goal.targetDate.toISOString().split('T')[0],
          status: goal.status,
          priority: goal.priority,
          progress: goal.progress
        })
      } else if (type === 'skill') {
        const skill = editItem as SkillProgress
        setFormData({
          ...formData,
          skillName: skill.skillName,
          skillCategory: skill.category,
          currentLevel: skill.currentLevel,
          targetLevel: skill.targetLevel,
          learningResources: skill.learningResources?.join(', ') || '',
          certifications: skill.certifications?.join(', ') || ''
        })
      }
    } else {
      // Reset form for new items
      setFormData({
        title: '',
        description: '',
        type: 'promotion',
        date: '',
        company: '',
        position: '',
        skills: '',
        impact: '',
        evidence: '',
        category: 'career_advancement',
        targetDate: '',
        status: 'not_started',
        priority: 'medium',
        progress: 0,
        skillName: '',
        skillCategory: 'technical',
        currentLevel: 1,
        targetLevel: 1,
        learningResources: '',
        certifications: ''
      })
    }
  }, [editItem, type])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return

    // Debug logging to ensure data is being captured
    console.log('Form data being submitted:', formData)

    if (type === 'milestone') {
      const milestone: CareerMilestone = {
        id: editItem?.id || `milestone-${Date.now()}`,
        userId: user.id,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        date: new Date(formData.date),
        company: formData.company || undefined,
        position: formData.position || undefined,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : undefined,
        impact: formData.impact || undefined,
        evidence: formData.evidence || undefined
      }

      if (editItem) {
        updateCareerMilestone(editItem.id, milestone)
      } else {
        addCareerMilestone(milestone)
      }
    } else if (type === 'goal') {
      const goal: CareerGoal = {
        id: editItem?.id || `goal-${Date.now()}`,
        userId: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        targetDate: new Date(formData.targetDate),
        status: formData.status,
        priority: formData.priority,
        progress: formData.progress,
        createdAt: editItem ? (editItem as CareerGoal).createdAt : new Date(),
        updatedAt: new Date()
      }

      if (editItem) {
        updateCareerGoal(editItem.id, goal)
      } else {
        addCareerGoal(goal)
      }
    } else if (type === 'skill') {
      const skill: SkillProgress = {
        id: editItem?.id || `skill-${Date.now()}`,
        userId: user.id,
        skillName: formData.skillName,
        category: formData.skillCategory,
        currentLevel: formData.currentLevel,
        targetLevel: formData.targetLevel,
        lastUpdated: new Date(),
        learningResources: formData.learningResources ? formData.learningResources.split(',').map(s => s.trim()) : undefined,
        certifications: formData.certifications ? formData.certifications.split(',').map(s => s.trim()) : undefined
      }

      if (editItem) {
        updateSkillProgress(editItem.id, skill)
      } else {
        addSkillProgress(skill)
      }
    }

    // Show success message
    alert(`${type === 'milestone' ? 'Milestone' : type === 'goal' ? 'Goal' : 'Skill'} saved successfully!`)
    
    onClose()
  }

  const getTypeIcon = () => {
    switch (type) {
      case 'milestone': return <Award className="w-6 h-6" />
      case 'goal': return <Target className="w-6 h-6" />
      case 'skill': return <BookOpen className="w-6 h-6" />
    }
  }

  const getTypeTitle = () => {
    switch (type) {
      case 'milestone': return editItem ? 'Edit Milestone' : 'Add Milestone'
      case 'goal': return editItem ? 'Edit Goal' : 'Add Goal'
      case 'skill': return editItem ? 'Edit Skill' : 'Add Skill'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              {getTypeIcon()}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{getTypeTitle()}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Real-time Typing Indicator */}
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-green-800 font-medium">✓ Real-time text capture active</p>
            </div>
            <p className="text-xs text-green-600 mt-1">All text you type will be displayed immediately below each field</p>
          </div>

          {/* Live Preview of what will be displayed */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="font-medium mb-3 text-blue-800">📋 Live Preview - This is how your entry will appear:</p>
            {type === 'skill' && (
              <div className="bg-white p-3 rounded border">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black">{formData.skillName || 'Skill Name'}</h4>
                    <p className="text-sm text-black capitalize">{formData.skillCategory || 'Category'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-black">Current Level: </span>
                    <span className="font-medium text-black">{formData.currentLevel}/5</span>
                  </div>
                  <div>
                    <span className="text-sm text-black">Target Level: </span>
                    <span className="font-medium text-black">{formData.targetLevel}/5</span>
                  </div>
                  {formData.learningResources && (
                    <div>
                      <p className="text-sm font-medium text-black">Learning Resources:</p>
                      <div className="text-xs text-black">
                        {formData.learningResources.split(',').map((resource, index) => (
                          <div key={index}>• {resource.trim()}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {formData.certifications && (
                    <div>
                      <p className="text-sm font-medium text-black">Certifications:</p>
                      <div className="text-xs text-black">
                        {formData.certifications.split(',').map((cert, index) => (
                          <div key={index}>• {cert.trim()}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {type === 'milestone' && (
              <div className="bg-white p-3 rounded border">
                <h4 className="font-semibold text-black mb-2">{formData.title || 'Milestone Title'}</h4>
                <p className="text-sm text-black mb-2">{formData.description || 'Description will appear here'}</p>
                <div className="text-xs text-black">
                  {formData.date && <span>Date: {new Date(formData.date).toLocaleDateString()}</span>}
                  {formData.company && <span> • Company: {formData.company}</span>}
                  {formData.position && <span> • Position: {formData.position}</span>}
                </div>
                {formData.skills && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {formData.skills.split(',').map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-black px-2 py-1 rounded-full text-xs">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {formData.impact && (
                  <div className="mt-2 p-2 bg-green-50 rounded text-xs text-black">
                    <strong>Impact:</strong> {formData.impact}
                  </div>
                )}
              </div>
            )}
            {type === 'goal' && (
              <div className="bg-white p-3 rounded border">
                <h4 className="font-semibold text-black mb-2">{formData.title || 'Goal Title'}</h4>
                <p className="text-sm text-black mb-2">{formData.description || 'Goal description will appear here'}</p>
                <div className="flex items-center space-x-4 text-xs text-black">
                  {formData.targetDate && <span>Target: {new Date(formData.targetDate).toLocaleDateString()}</span>}
                  <span className={`px-2 py-1 rounded-full ${formData.priority === 'high' ? 'bg-red-100 text-red-800' : formData.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {formData.priority} priority
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-black">Progress</span>
                    <span className="text-sm font-medium text-black">{formData.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${formData.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {type === 'milestone' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title * {formData.title && <span className="text-green-600">✓</span>}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formData.title ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                  }`}
                  required
                  placeholder="Enter milestone title..."
                  autoComplete="off"
                />
                {formData.title && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">Live Text Preview:</p>
                    <p className="text-sm text-gray-800 mt-1">"{formData.title}"</p>
                    <p className="text-xs text-gray-500 mt-1">Characters: {formData.title.length}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type * {formData.type && <span className="text-green-600">✓</span>}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as CareerMilestone['type'] })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formData.type ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                    }`}
                    required
                  >
                    <option value="promotion">Promotion</option>
                    <option value="job_change">Job Change</option>
                    <option value="certification">Certification</option>
                    <option value="achievement">Achievement</option>
                    <option value="education">Education</option>
                    <option value="project">Project</option>
                    <option value="award">Award</option>
                  </select>
                  {formData.type && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-blue-600 font-medium">Selected Type:</p>
                      <p className="text-sm text-black mt-1 capitalize">
                        {formData.type === 'promotion' && '📈 Promotion'}
                        {formData.type === 'job_change' && '🏢 Job Change'}
                        {formData.type === 'certification' && '🏆 Certification'}
                        {formData.type === 'achievement' && '⭐ Achievement'}
                        {formData.type === 'education' && '🎓 Education'}
                        {formData.type === 'project' && '🚀 Project'}
                        {formData.type === 'award' && '🏅 Award'}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date * {formData.date && <span className="text-green-600">✓</span>}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formData.date ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                    }`}
                    required
                  />
                  {formData.date && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-blue-600 font-medium">Selected Date:</p>
                      <p className="text-sm text-black mt-1">
                        📅 {new Date(formData.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company {formData.company && <span className="text-green-600">✓</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formData.company ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Enter company name..."
                    autoComplete="off"
                  />
                  {formData.company && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-blue-600 font-medium">Company Entered:</p>
                      <p className="text-sm text-black mt-1">🏢 "{formData.company}"</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position {formData.position && <span className="text-green-600">✓</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formData.position ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="Enter position title..."
                    autoComplete="off"
                  />
                  {formData.position && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-blue-600 font-medium">Position Entered:</p>
                      <p className="text-sm text-black mt-1">👔 "{formData.position}"</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., Leadership, System Design, Mentoring"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Impact
                </label>
                <textarea
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  rows={2}
                  placeholder="Describe the impact or results of this milestone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evidence URL
                </label>
                <input
                  type="url"
                  value={formData.evidence}
                  onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                  placeholder="https://example.com/certificate.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {type === 'goal' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CareerGoal['category'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="career_advancement">Career Advancement</option>
                    <option value="skill_development">Skill Development</option>
                    <option value="networking">Networking</option>
                    <option value="education">Education</option>
                    <option value="leadership">Leadership</option>
                    <option value="entrepreneurship">Entrepreneurship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date *
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as CareerGoal['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="not_started">Not Started</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as CareerGoal['priority'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Progress (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {type === 'skill' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name * {formData.skillName && <span className="text-green-600">✓</span>}
                </label>
                <input
                  type="text"
                  value={formData.skillName}
                  onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formData.skillName ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                  }`}
                  required
                  placeholder="e.g., React, Python, Leadership..."
                  autoComplete="off"
                />
                {formData.skillName && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">Live Text Preview:</p>
                    <p className="text-sm text-black mt-1">
                      "{formData.skillName}"
                      <span className="inline-block w-0.5 h-4 bg-blue-600 ml-1 animate-pulse"></span>
                    </p>
                    <p className="text-xs text-black mt-1">Characters: {formData.skillName.length}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category * {formData.skillCategory && <span className="text-green-600">✓</span>}
                </label>
                <select
                  value={formData.skillCategory}
                  onChange={(e) => setFormData({ ...formData, skillCategory: e.target.value as SkillProgress['category'] })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formData.skillCategory ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                  }`}
                  required
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skills</option>
                  <option value="leadership">Leadership</option>
                  <option value="domain">Domain Knowledge</option>
                </select>
                {formData.skillCategory && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">Selected Category:</p>
                    <p className="text-sm text-black mt-1 capitalize">
                      {formData.skillCategory === 'technical' && '🔧 Technical'}
                      {formData.skillCategory === 'soft' && '🤝 Soft Skills'}
                      {formData.skillCategory === 'leadership' && '👑 Leadership'}
                      {formData.skillCategory === 'domain' && '📚 Domain Knowledge'}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Level (1-5) {formData.currentLevel && <span className="text-green-600">✓</span>}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.currentLevel}
                    onChange={(e) => setFormData({ ...formData, currentLevel: parseInt(e.target.value) || 1 })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formData.currentLevel ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                    }`}
                  />
                  {formData.currentLevel && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-blue-600 font-medium">Current Level Selected:</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-4 h-4 rounded-full ${
                                level <= formData.currentLevel ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-black font-medium">{formData.currentLevel}/5</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Level (1-5) {formData.targetLevel && <span className="text-green-600">✓</span>}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.targetLevel}
                    onChange={(e) => setFormData({ ...formData, targetLevel: parseInt(e.target.value) || 1 })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formData.targetLevel ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                    }`}
                  />
                  {formData.targetLevel && (
                    <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                      <p className="text-xs text-green-600 font-medium">Target Level Selected:</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-4 h-4 rounded-full ${
                                level <= formData.targetLevel ? 'bg-green-600' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-black font-medium">{formData.targetLevel}/5</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Resources (comma-separated) {formData.learningResources && <span className="text-green-600">✓</span>}
                </label>
                <input
                  type="text"
                  value={formData.learningResources}
                  onChange={(e) => setFormData({ ...formData, learningResources: e.target.value })}
                  placeholder="e.g., React Documentation, Advanced React Patterns Course"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formData.learningResources ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                  }`}
                  autoComplete="off"
                />
                {formData.learningResources && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">Live Text Preview:</p>
                    <p className="text-sm text-black mt-1">
                      "{formData.learningResources}"
                      <span className="inline-block w-0.5 h-4 bg-blue-600 ml-1 animate-pulse"></span>
                    </p>
                    <p className="text-xs text-black mt-1">Characters: {formData.learningResources.length}</p>
                    <div className="mt-2">
                      <p className="text-xs text-black mb-1">Resources entered:</p>
                      <div className="text-xs text-black bg-gray-50 p-2 rounded">
                        {formData.learningResources.split(',').map((resource, index) => (
                          <div key={index}>• {resource.trim()}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications (comma-separated) {formData.certifications && <span className="text-green-600">✓</span>}
                </label>
                <input
                  type="text"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  placeholder="e.g., React Developer Certification, AWS Solutions Architect"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formData.certifications ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-white'
                  }`}
                  autoComplete="off"
                />
                {formData.certifications && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs text-blue-600 font-medium">Live Text Preview:</p>
                    <p className="text-sm text-black mt-1">
                      "{formData.certifications}"
                      <span className="inline-block w-0.5 h-4 bg-blue-600 ml-1 animate-pulse"></span>
                    </p>
                    <p className="text-xs text-black mt-1">Characters: {formData.certifications.length}</p>
                    <div className="mt-2">
                      <p className="text-xs text-black mb-1">Certifications entered:</p>
                      <div className="text-xs text-black bg-gray-50 p-2 rounded">
                        {formData.certifications.split(',').map((cert, index) => (
                          <div key={index}>• {cert.trim()}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {editItem ? 'Update' : 'Add'} {type === 'milestone' ? 'Milestone' : type === 'goal' ? 'Goal' : 'Skill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
