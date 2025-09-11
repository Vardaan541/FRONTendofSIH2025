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

interface AppState {
  user: User | null
  posts: Post[]
  sessionRequests: SessionRequest[]
  setUser: (user: User | null) => void
  addPost: (post: Post) => void
  addSessionRequest: (request: SessionRequest) => void
  updateSessionRequest: (id: string, status: 'accepted' | 'rejected') => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  posts: [],
  sessionRequests: [],
  setUser: (user) => set({ user }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  addSessionRequest: (request) => set((state) => ({ 
    sessionRequests: [request, ...state.sessionRequests] 
  })),
  updateSessionRequest: (id, status) => set((state) => ({
    sessionRequests: state.sessionRequests.map(req => 
      req.id === id ? { ...req, status } : req
    )
  }))
}))
