import { create } from 'zustand'

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'alumni' | 'admin'
  profileImage?: string
  bio?: string
  department?: string
  graduationYear?: number
  currentPosition?: string
  company?: string
  followers?: number
  following?: number
}

export interface Post {
  id: string
  authorId: string
  authorName: string
  authorImage?: string
  content: string
  timestamp: Date
  likes: number
  comments: number
  imageUrl?: string
  attachmentUrl?: string
  attachmentName?: string
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  authorName: string
  authorImage?: string
  content: string
  timestamp: Date
  likes: number
  imageUrl?: string
  attachmentUrl?: string
  attachmentName?: string
}

export interface SessionRequest {
  id: string
  studentId: string
  studentName: string
  alumniId: string
  alumniName: string
  hours: number
  amount: number
  status: 'pending' | 'accepted' | 'rejected'
  message?: string
  timestamp: Date
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  senderName: string
  senderImage?: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'file'
  isEdited?: boolean
  isDeleted?: boolean
}

export interface Chat {
  id: string
  type: 'direct' | 'group'
  name: string
  image?: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  isPinned: boolean
  isFavorite: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CareerMilestone {
  id: string
  userId: string
  title: string
  description: string
  type: 'promotion' | 'job_change' | 'certification' | 'achievement' | 'education' | 'project' | 'award'
  date: Date
  company?: string
  position?: string
  skills?: string[]
  impact?: string
  evidence?: string // URL to certificate, image, etc.
}

export interface CareerGoal {
  id: string
  userId: string
  title: string
  description: string
  category: 'skill_development' | 'career_advancement' | 'networking' | 'education' | 'leadership' | 'entrepreneurship'
  targetDate: Date
  status: 'not_started' | 'in_progress' | 'completed' | 'paused'
  priority: 'low' | 'medium' | 'high'
  progress: number // 0-100
  milestones?: string[] // Array of milestone IDs
  createdAt: Date
  updatedAt: Date
}

export interface SkillProgress {
  id: string
  userId: string
  skillName: string
  category: 'technical' | 'soft' | 'leadership' | 'domain'
  currentLevel: number // 1-5 scale
  targetLevel: number // 1-5 scale
  lastUpdated: Date
  learningResources?: string[]
  certifications?: string[]
}

export interface EventRequest {
  id: string
  title: string
  description: string
  submittedBy: string
  submittedDate: string
  status: 'pending' | 'approved' | 'rejected'
  priority: 'low' | 'medium' | 'high'
  collegeId: string
  details: {
    eventName: string
    date: string
    time: string
    venue: string
    expectedAttendees: number
    budget: number
    type: 'networking' | 'workshop' | 'conference' | 'reunion' | 'social'
    contactEmail: string
    contactPhone?: string
    organizer: string
  }
}

export interface CareerProgress {
  userId: string
  currentPosition: string
  currentCompany: string
  yearsOfExperience: number
  totalMilestones: number
  completedGoals: number
  activeGoals: number
  skillsCount: number
  lastUpdated: Date
}

interface AppState {
  user: User | null
  posts: Post[]
  comments: Comment[]
  sessionRequests: SessionRequest[]
  chats: Chat[]
  messages: Message[]
  careerMilestones: CareerMilestone[]
  careerGoals: CareerGoal[]
  skillProgress: SkillProgress[]
  careerProgress: CareerProgress | null
  eventRequests: EventRequest[]
  setUser: (user: User | null) => void
  addPost: (post: Post) => void
  updatePost: (id: string, updates: Partial<Post>) => void
  addComment: (comment: Comment) => void
  updateComment: (id: string, updates: Partial<Comment>) => void
  addSessionRequest: (request: SessionRequest) => void
  updateSessionRequest: (id: string, status: 'accepted' | 'rejected') => void
  addChat: (chat: Chat) => void
  updateChat: (id: string, updates: Partial<Chat>) => void
  addMessage: (message: Message) => void
  updateMessage: (id: string, updates: Partial<Message>) => void
  markChatAsRead: (chatId: string) => void
  toggleChatPin: (chatId: string) => void
  toggleChatFavorite: (chatId: string) => void
  updateUserStats: (userId: string, updates: Partial<User>) => void
  // Career Progress Management
  addCareerMilestone: (milestone: CareerMilestone) => void
  updateCareerMilestone: (id: string, updates: Partial<CareerMilestone>) => void
  deleteCareerMilestone: (id: string) => void
  addCareerGoal: (goal: CareerGoal) => void
  updateCareerGoal: (id: string, updates: Partial<CareerGoal>) => void
  deleteCareerGoal: (id: string) => void
  addSkillProgress: (skill: SkillProgress) => void
  updateSkillProgress: (id: string, updates: Partial<SkillProgress>) => void
  deleteSkillProgress: (id: string) => void
  updateCareerProgress: (progress: CareerProgress) => void
  // Event Request Management
  addEventRequest: (request: EventRequest) => void
  updateEventRequest: (id: string, updates: Partial<EventRequest>) => void
  deleteEventRequest: (id: string) => void
}

// Sample data for demonstration
const sampleChats: Chat[] = [
  {
    id: '1',
    type: 'direct',
    name: 'Alex Rao',
    image: undefined,
    participants: ['user1', 'alex_rao'],
    unreadCount: 0,
    isPinned: true,
    isFavorite: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15T10:32:00'),
    lastMessage: {
      id: 'msg1',
      chatId: '1',
      senderId: 'user1',
      senderName: 'You',
      content: 'Yes, at 4 PM.',
      timestamp: new Date('2024-01-15T10:32:00'),
      type: 'text'
    }
  },
  {
    id: '2',
    type: 'direct',
    name: 'Priya Verma',
    image: undefined,
    participants: ['user1', 'priya_verma'],
    unreadCount: 0,
    isPinned: false,
    isFavorite: false,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14T15:45:00'),
    lastMessage: {
      id: 'msg2',
      chatId: '2',
      senderId: 'priya_verma',
      senderName: 'Priya Verma',
      content: 'Got it, thanks!',
      timestamp: new Date('2024-01-14T15:45:00'),
      type: 'text'
    }
  },
  {
    id: '3',
    type: 'group',
    name: 'Tech Group',
    image: undefined,
    participants: ['user1', 'alex_rao', 'priya_verma', 'sam_lee'],
    unreadCount: 2,
    isPinned: false,
    isFavorite: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15T14:00:00'),
    lastMessage: {
      id: 'msg3',
      chatId: '3',
      senderId: 'alex_rao',
      senderName: 'Alex Rao',
      content: 'Next meeting at 2 PM',
      timestamp: new Date('2024-01-15T14:00:00'),
      type: 'text'
    }
  },
  {
    id: '4',
    type: 'direct',
    name: 'Sam Lee',
    image: undefined,
    participants: ['user1', 'sam_lee'],
    unreadCount: 0,
    isPinned: false,
    isFavorite: false,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12T22:30:00'),
    lastMessage: {
      id: 'msg4',
      chatId: '4',
      senderId: 'sam_lee',
      senderName: 'Sam Lee',
      content: 'Good night, Sam!',
      timestamp: new Date('2024-01-12T22:30:00'),
      type: 'text'
    }
  },
  {
    id: '5',
    type: 'group',
    name: 'Friends Group',
    image: undefined,
    participants: ['user1', 'alex_rao', 'priya_verma'],
    unreadCount: 0,
    isPinned: true,
    isFavorite: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-13T16:20:00'),
    lastMessage: {
      id: 'msg5',
      chatId: '5',
      senderId: 'priya_verma',
      senderName: 'Priya Verma',
      content: "Let's plan a hike.",
      timestamp: new Date('2024-01-13T16:20:00'),
      type: 'text'
    }
  }
]

const sampleMessages: Message[] = [
  {
    id: 'msg1',
    chatId: '1',
    senderId: 'alex_rao',
    senderName: 'Alex Rao',
    content: 'Hey, are we meeting today?',
    timestamp: new Date('2024-01-15T10:30:00'),
    type: 'text'
  },
  {
    id: 'msg2',
    chatId: '1',
    senderId: 'user1',
    senderName: 'You',
    content: 'Yes, at 4 PM.',
    timestamp: new Date('2024-01-15T10:32:00'),
    type: 'text'
  }
]

// Sample career progress data
const sampleCareerMilestones: CareerMilestone[] = [
  {
    id: 'milestone-1',
    userId: 'user1',
    title: 'Promoted to Senior Software Engineer',
    description: 'Successfully promoted to Senior Software Engineer role at Google',
    type: 'promotion',
    date: new Date('2023-12-01'),
    company: 'Google',
    position: 'Senior Software Engineer',
    skills: ['Leadership', 'System Design', 'Mentoring'],
    impact: 'Led a team of 5 engineers and improved system performance by 40%'
  },
  {
    id: 'milestone-2',
    userId: 'user1',
    title: 'AWS Solutions Architect Certification',
    description: 'Earned AWS Solutions Architect Professional certification',
    type: 'certification',
    date: new Date('2023-10-15'),
    skills: ['AWS', 'Cloud Architecture', 'DevOps'],
    evidence: 'https://example.com/certificate.pdf'
  },
  {
    id: 'milestone-3',
    userId: 'user1',
    title: 'Joined Google',
    description: 'Started new role as Software Engineer at Google',
    type: 'job_change',
    date: new Date('2022-06-01'),
    company: 'Google',
    position: 'Software Engineer'
  }
]

const sampleCareerGoals: CareerGoal[] = [
  {
    id: 'goal-1',
    userId: 'user1',
    title: 'Become a Tech Lead',
    description: 'Advance to a technical leadership role within the next 2 years',
    category: 'career_advancement',
    targetDate: new Date('2025-12-31'),
    status: 'in_progress',
    priority: 'high',
    progress: 60,
    milestones: ['milestone-1'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'goal-2',
    userId: 'user1',
    title: 'Master Machine Learning',
    description: 'Develop expertise in machine learning and AI technologies',
    category: 'skill_development',
    targetDate: new Date('2024-12-31'),
    status: 'in_progress',
    priority: 'medium',
    progress: 30,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'goal-3',
    userId: 'user1',
    title: 'Build Professional Network',
    description: 'Connect with 100+ industry professionals and attend 12 networking events',
    category: 'networking',
    targetDate: new Date('2024-06-30'),
    status: 'in_progress',
    priority: 'medium',
    progress: 45,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  }
]

const sampleSkillProgress: SkillProgress[] = [
  {
    id: 'skill-1',
    userId: 'user1',
    skillName: 'React',
    category: 'technical',
    currentLevel: 4,
    targetLevel: 5,
    lastUpdated: new Date('2024-01-15'),
    learningResources: ['React Documentation', 'Advanced React Patterns Course'],
    certifications: ['React Developer Certification']
  },
  {
    id: 'skill-2',
    userId: 'user1',
    skillName: 'Leadership',
    category: 'leadership',
    currentLevel: 3,
    targetLevel: 4,
    lastUpdated: new Date('2024-01-10'),
    learningResources: ['Leadership in Tech Course', 'Mentoring Best Practices']
  },
  {
    id: 'skill-3',
    userId: 'user1',
    skillName: 'System Design',
    category: 'technical',
    currentLevel: 4,
    targetLevel: 5,
    lastUpdated: new Date('2024-01-12'),
    learningResources: ['System Design Interview Prep', 'Distributed Systems Course']
  }
]

const sampleCareerProgress: CareerProgress = {
  userId: 'user1',
  currentPosition: 'Senior Software Engineer',
  currentCompany: 'Google',
  yearsOfExperience: 5,
  totalMilestones: 3,
  completedGoals: 0,
  activeGoals: 3,
  skillsCount: 3,
  lastUpdated: new Date('2024-01-15')
}

// Sample event requests data
const sampleEventRequests: EventRequest[] = [
  {
    id: '1',
    title: 'Tech Talk 2024 - Annual Conference',
    description: 'Annual technology conference for alumni and students featuring industry leaders and networking opportunities.',
    submittedBy: 'Sarah Johnson',
    submittedDate: '2024-01-14T15:45:00Z',
    status: 'pending',
    priority: 'high',
    collegeId: 'EVT-2024-001',
    details: {
      eventName: 'Tech Talk 2024',
      date: '2024-03-15',
      time: '18:00',
      venue: 'University Auditorium',
      expectedAttendees: 200,
      budget: 15000,
      type: 'conference',
      contactEmail: 'sarah.johnson@email.com',
      contactPhone: '+1 (555) 123-4567',
      organizer: 'Sarah Johnson'
    }
  },
  {
    id: '2',
    title: 'Networking Mixer - Alumni Meetup',
    description: 'Casual networking event for alumni to connect and share experiences in a relaxed environment.',
    submittedBy: 'Michael Chen',
    submittedDate: '2024-01-16T10:30:00Z',
    status: 'pending',
    priority: 'medium',
    collegeId: 'EVT-REQ-20240116',
    details: {
      eventName: 'Networking Mixer - Alumni Meetup',
      date: '2024-04-20',
      time: '19:00',
      venue: 'Downtown Conference Center',
      expectedAttendees: 50,
      budget: 2500,
      type: 'networking',
      contactEmail: 'michael.chen@email.com',
      contactPhone: '+1 (555) 234-5678',
      organizer: 'Michael Chen'
    }
  },
  {
    id: '3',
    title: 'Data Science Workshop',
    description: 'Hands-on workshop covering machine learning fundamentals and practical applications.',
    submittedBy: 'Emily Rodriguez',
    submittedDate: '2024-01-12T14:15:00Z',
    status: 'approved',
    priority: 'medium',
    collegeId: 'EVT-WS-20240112',
    details: {
      eventName: 'Data Science Workshop',
      date: '2024-02-28',
      time: '14:00',
      venue: 'Computer Lab 3',
      expectedAttendees: 30,
      budget: 800,
      type: 'workshop',
      contactEmail: 'emily.rodriguez@email.com',
      contactPhone: '+1 (555) 345-6789',
      organizer: 'Emily Rodriguez'
    }
  }
]

export const useStore = create<AppState>((set) => ({
  user: null,
  posts: [],
  comments: [],
  sessionRequests: [],
  chats: sampleChats,
  messages: sampleMessages,
  careerMilestones: sampleCareerMilestones,
  careerGoals: sampleCareerGoals,
  skillProgress: sampleSkillProgress,
  careerProgress: sampleCareerProgress,
  eventRequests: sampleEventRequests,
  setUser: (user) => set({ user }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (id, updates) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === id ? { ...post, ...updates } : post
    )
  })),
  addComment: (comment) => set((state) => ({ 
    comments: [comment, ...state.comments] 
  })),
  updateComment: (id, updates) => set((state) => ({
    comments: state.comments.map(comment => 
      comment.id === id ? { ...comment, ...updates } : comment
    )
  })),
  addSessionRequest: (request) => set((state) => ({ 
    sessionRequests: [request, ...state.sessionRequests] 
  })),
  updateSessionRequest: (id, status) => set((state) => ({
    sessionRequests: state.sessionRequests.map(req => 
      req.id === id ? { ...req, status } : req
    )
  })),
  addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
  updateChat: (id, updates) => set((state) => ({
    chats: state.chats.map(chat => 
      chat.id === id ? { ...chat, ...updates } : chat
    )
  })),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  updateMessage: (id, updates) => set((state) => ({
    messages: state.messages.map(msg => 
      msg.id === id ? { ...msg, ...updates } : msg
    )
  })),
  markChatAsRead: (chatId) => set((state) => ({
    chats: state.chats.map(chat => 
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    )
  })),
  toggleChatPin: (chatId) => set((state) => ({
    chats: state.chats.map(chat => 
      chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
    )
  })),
  toggleChatFavorite: (chatId) => set((state) => ({
    chats: state.chats.map(chat => 
      chat.id === chatId ? { ...chat, isFavorite: !chat.isFavorite } : chat
    )
  })),
  updateUserStats: (userId, updates) => set((state) => ({
    user: state.user?.id === userId ? { ...state.user, ...updates } : state.user
  })),
  // Career Progress Management
  addCareerMilestone: (milestone) => set((state) => ({ 
    careerMilestones: [milestone, ...state.careerMilestones] 
  })),
  updateCareerMilestone: (id, updates) => set((state) => ({
    careerMilestones: state.careerMilestones.map(milestone => 
      milestone.id === id ? { ...milestone, ...updates } : milestone
    )
  })),
  deleteCareerMilestone: (id) => set((state) => ({
    careerMilestones: state.careerMilestones.filter(milestone => milestone.id !== id)
  })),
  addCareerGoal: (goal) => set((state) => ({ 
    careerGoals: [goal, ...state.careerGoals] 
  })),
  updateCareerGoal: (id, updates) => set((state) => ({
    careerGoals: state.careerGoals.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    )
  })),
  deleteCareerGoal: (id) => set((state) => ({
    careerGoals: state.careerGoals.filter(goal => goal.id !== id)
  })),
  addSkillProgress: (skill) => set((state) => ({ 
    skillProgress: [skill, ...state.skillProgress] 
  })),
  updateSkillProgress: (id, updates) => set((state) => ({
    skillProgress: state.skillProgress.map(skill => 
      skill.id === id ? { ...skill, ...updates } : skill
    )
  })),
  deleteSkillProgress: (id) => set((state) => ({
    skillProgress: state.skillProgress.filter(skill => skill.id !== id)
  })),
  updateCareerProgress: (progress) => set({ careerProgress: progress }),
  // Event Request Management
  addEventRequest: (request) => set((state) => ({ 
    eventRequests: [request, ...state.eventRequests] 
  })),
  updateEventRequest: (id, updates) => set((state) => ({
    eventRequests: state.eventRequests.map(request => 
      request.id === id ? { ...request, ...updates } : request
    )
  })),
  deleteEventRequest: (id) => set((state) => ({
    eventRequests: state.eventRequests.filter(request => request.id !== id)
  }))
}))
