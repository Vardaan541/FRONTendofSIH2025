'use client'

import { CareerMilestone } from '@/lib/store'
import { 
  TrendingUp, 
  Building, 
  Award, 
  Star, 
  BookOpen, 
  Activity, 
  Calendar,
  MapPin
} from 'lucide-react'

interface CareerTimelineProps {
  milestones: CareerMilestone[]
}

export default function CareerTimeline({ milestones }: CareerTimelineProps) {
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

  const getMilestoneColor = (type: string) => {
    switch (type) {
      case 'promotion': return 'bg-green-500'
      case 'job_change': return 'bg-blue-500'
      case 'certification': return 'bg-purple-500'
      case 'achievement': return 'bg-yellow-500'
      case 'education': return 'bg-indigo-500'
      case 'project': return 'bg-pink-500'
      case 'award': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short'
    }).format(date)
  }

  // Sort milestones by date (newest first)
  const sortedMilestones = [...milestones].sort((a, b) => b.date.getTime() - a.date.getTime())

  if (milestones.length === 0) {
    return (
      <div className="text-center py-12">
        <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No milestones yet</h3>
        <p className="text-gray-600">Start tracking your career achievements by adding your first milestone!</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      
      <div className="space-y-8">
        {sortedMilestones.map((milestone, index) => (
          <div key={milestone.id} className="relative flex items-start space-x-6">
            {/* Timeline dot */}
            <div className={`relative z-10 w-16 h-16 ${getMilestoneColor(milestone.type)} rounded-full flex items-center justify-center text-white shadow-lg`}>
              {getMilestoneIcon(milestone.type)}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{milestone.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(milestone.date)}</span>
                      </div>
                      {milestone.company && (
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4" />
                          <span>{milestone.company}</span>
                        </div>
                      )}
                      {milestone.position && (
                        <span>• {milestone.position}</span>
                      )}
                    </div>
                    
                    {milestone.skills && milestone.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills Developed:</p>
                        <div className="flex flex-wrap gap-2">
                          {milestone.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {milestone.impact && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          <strong>Impact:</strong> {milestone.impact}
                        </p>
                      </div>
                    )}
                    
                    {milestone.evidence && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 mb-2">
                          <strong>Evidence:</strong>
                        </p>
                        <a 
                          href={milestone.evidence} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline break-all"
                        >
                          {milestone.evidence}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
