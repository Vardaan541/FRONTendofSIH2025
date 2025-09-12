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

interface AppState {
  user: User | null
  posts: Post[]
  comments: Comment[]
  sessionRequests: SessionRequest[]
  chats: Chat[]
  messages: Message[]
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

export const useStore = create<AppState>((set) => ({
  user: null,
  posts: [],
  comments: [],
  sessionRequests: [],
  chats: sampleChats,
  messages: sampleMessages,
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
  }))
}))
