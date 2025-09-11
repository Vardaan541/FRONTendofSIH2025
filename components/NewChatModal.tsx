'use client'

import { useState } from 'react'
import { useStore, Chat } from '@/lib/store'
import { X, Search, User, Users } from 'lucide-react'

interface NewChatModalProps {
  isOpen: boolean
  onClose: () => void
  onChatCreated: (chat: Chat) => void
}

export default function NewChatModal({ isOpen, onClose, onChatCreated }: NewChatModalProps) {
  const { user } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [chatName, setChatName] = useState('')
  const [chatType, setChatType] = useState<'direct' | 'group'>('direct')

  // Sample users for demonstration
  const sampleUsers = [
    { id: 'alex_rao', name: 'Alex Rao', role: 'alumni', department: 'Computer Science' },
    { id: 'priya_verma', name: 'Priya Verma', role: 'alumni', department: 'Data Science' },
    { id: 'sam_lee', name: 'Sam Lee', role: 'student', department: 'Computer Science' },
    { id: 'john_doe', name: 'John Doe', role: 'alumni', department: 'Engineering' },
    { id: 'sarah_smith', name: 'Sarah Smith', role: 'student', department: 'Data Science' },
  ]

  const filteredUsers = sampleUsers.filter(u => 
    u.id !== user?.id && 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUserSelect = (userId: string) => {
    if (chatType === 'direct') {
      setSelectedUsers([userId])
    } else {
      setSelectedUsers(prev => 
        prev.includes(userId) 
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      )
    }
  }

  const handleCreateChat = () => {
    if (selectedUsers.length === 0) return

    const selectedUser = sampleUsers.find(u => u.id === selectedUsers[0])
    const chatName = chatType === 'direct' 
      ? selectedUser?.name || 'New Chat'
      : 'New Group'

    const newChat: Chat = {
      id: Date.now().toString(),
      type: chatType,
      name: chatName,
      participants: [user?.id || '', ...selectedUsers],
      unreadCount: 0,
      isPinned: false,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    onChatCreated(newChat)
    onClose()
    setSearchQuery('')
    setSelectedUsers([])
    setChatName('')
    setChatType('direct')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">New Chat</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Chat Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chat Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="direct"
                  checked={chatType === 'direct'}
                  onChange={(e) => setChatType(e.target.value as 'direct')}
                  className="mr-2"
                />
                <User className="w-4 h-4 mr-1" />
                Direct Message
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="group"
                  checked={chatType === 'group'}
                  onChange={(e) => setChatType(e.target.value as 'group')}
                  className="mr-2"
                />
                <Users className="w-4 h-4 mr-1" />
                Group Chat
              </label>
            </div>
          </div>

          {/* Group Name Input */}
          {chatType === 'group' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Name
              </label>
              <input
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                placeholder="Enter group name..."
                className="input-enhanced"
              />
            </div>
          )}

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {chatType === 'direct' ? 'Select User' : 'Add Members'}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="input-enhanced pl-10"
              />
            </div>
          </div>

          {/* User List */}
          <div className="max-h-48 overflow-y-auto space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedUsers.includes(user.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                    <span className="text-sm">{user.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{user.name}</h4>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role} • {user.department}
                    </p>
                  </div>
                  {selectedUsers.includes(user.id) && (
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected ({selectedUsers.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map((userId) => {
                  const user = sampleUsers.find(u => u.id === userId)
                  return (
                    <div
                      key={userId}
                      className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{user?.name}</span>
                      <button
                        onClick={() => handleUserSelect(userId)}
                        className="hover:text-purple-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateChat}
            disabled={selectedUsers.length === 0}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  )
}



