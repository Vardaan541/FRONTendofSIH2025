'use client'

import { useState } from 'react'
import { useStore, Chat } from '@/lib/store'
import { Search, Pin, Star, Users, MessageCircle, Plus } from 'lucide-react'
import NewChatModal from './NewChatModal'

interface ChatListProps {
  onChatSelect: (chat: Chat) => void
  selectedChatId?: string
}

export default function ChatList({ onChatSelect, selectedChatId }: ChatListProps) {
  const { chats, toggleChatPin, toggleChatFavorite, addChat } = useStore()
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups' | 'favorites' | 'pinned'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false)

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    switch (activeTab) {
      case 'unread':
        return matchesSearch && chat.unreadCount > 0
      case 'groups':
        return matchesSearch && chat.type === 'group'
      case 'favorites':
        return matchesSearch && chat.isFavorite
      case 'pinned':
        return matchesSearch && chat.isPinned
      default:
        return matchesSearch
    }
  })

  const sortedChats = [...filteredChats].sort((a, b) => {
    // Pinned chats first
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    
    // Then by last message time
    if (a.lastMessage && b.lastMessage) {
      return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
    }
    
    return 0
  })

  const formatTime = (date: Date) => {
    const now = new Date()
    const messageDate = new Date(date)
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const handleNewChat = (chat: Chat) => {
    addChat(chat)
    onChatSelect(chat)
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-purple-600 mb-4">MessagingHub</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search contacts, chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-enhanced pl-10 w-full"
          />
        </div>
        
        {/* New Chat Button */}
        <button
          onClick={() => setIsNewChatModalOpen(true)}
          className="w-full mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'all', label: 'All Chats', icon: MessageCircle },
          { id: 'unread', label: 'Unread Chats', icon: MessageCircle },
          { id: 'groups', label: 'Groups', icon: Users },
          { id: 'favorites', label: 'Favourites', icon: Star },
          { id: 'pinned', label: 'Pinned', icon: Pin }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === id
                ? 'border-purple-500 text-purple-600 bg-purple-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-1">
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
            {activeTab === 'all' ? 'All Chats' : 
             activeTab === 'unread' ? 'Unread Chats' :
             activeTab === 'groups' ? 'Groups' :
             activeTab === 'favorites' ? 'Favourites' : 'Pinned'}
          </h3>
          
          {sortedChats.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No chats found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {sortedChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => onChatSelect(chat)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                    selectedChatId === chat.id
                      ? 'bg-purple-100 border border-purple-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {chat.image ? (
                          <img src={chat.image} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                          <span className="text-sm">{getInitials(chat.name)}</span>
                        )}
                      </div>
                      {chat.type === 'group' && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Users className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Chat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {chat.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {chat.isPinned && (
                            <Pin className="w-3 h-3 text-red-500" />
                          )}
                          {chat.isFavorite && (
                            <Star className="w-3 h-3 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      
                      {chat.lastMessage && (
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500 truncate">
                            {chat.lastMessage.content}
                          </p>
                          <span className="text-xs text-gray-400 ml-2">
                            {formatTime(chat.lastMessage.timestamp)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Unread Count */}
                    {chat.unreadCount > 0 && (
                      <div className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleChatPin(chat.id)
                      }}
                      className={`p-1 rounded ${
                        chat.isPinned ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Pin className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleChatFavorite(chat.id)
                      }}
                      className={`p-1 rounded ${
                        chat.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* New Chat Modal */}
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onChatCreated={handleNewChat}
      />
    </div>
  )
}
