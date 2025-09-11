'use client'

import { useState, useRef, useEffect } from 'react'
import { useStore, Chat, Message } from '@/lib/store'
import { Send, Smile, Paperclip, Edit, Trash2, MoreVertical } from 'lucide-react'

interface ChatViewProps {
  chat: Chat | null
}

export default function ChatView({ chat }: ChatViewProps) {
  const { user, messages, addMessage, updateMessage, markChatAsRead } = useStore()
  const [newMessage, setNewMessage] = useState('')
  const [editingMessage, setEditingMessage] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatMessages = messages.filter(msg => msg.chatId === chat?.id)

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  useEffect(() => {
    if (chat) {
      markChatAsRead(chat.id)
    }
  }, [chat, markChatAsRead])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chat || !user) return

    const message: Message = {
      id: Date.now().toString(),
      chatId: chat.id,
      senderId: user.id,
      senderName: user.name,
      senderImage: user.profileImage,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    }

    addMessage(message)
    setNewMessage('')
  }

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessage(messageId)
    setEditContent(content)
  }

  const handleSaveEdit = () => {
    if (!editingMessage || !editContent.trim()) return

    updateMessage(editingMessage, { 
      content: editContent.trim(), 
      isEdited: true 
    })
    setEditingMessage(null)
    setEditContent('')
  }

  const handleDeleteMessage = (messageId: string) => {
    updateMessage(messageId, { 
      content: 'This message was deleted', 
      isDeleted: true 
    })
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a chat to start messaging</h3>
          <p className="text-gray-500">Choose a conversation from the list to begin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
            {chat.image ? (
              <img src={chat.image} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <span className="text-sm">{getInitials(chat.name)}</span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{chat.name}</h2>
            <p className="text-sm text-gray-500">
              {chat.type === 'group' ? `${chat.participants.length} members` : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[70%] ${message.senderId === user?.id ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {message.senderId !== user?.id && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold mr-2 flex-shrink-0">
                    {message.senderImage ? (
                      <img src={message.senderImage} alt={message.senderName} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <span>{getInitials(message.senderName)}</span>
                    )}
                  </div>
                )}

                {/* Message Bubble */}
                <div className="relative group">
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.senderId === user?.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-blue-500 text-white'
                    } ${message.isDeleted ? 'opacity-60' : ''}`}
                  >
                    {editingMessage === message.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="bg-transparent border border-white/30 rounded px-2 py-1 text-white placeholder-white/70 flex-1"
                          placeholder="Edit message..."
                          autoFocus
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="text-white hover:text-gray-200"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.isEdited && (
                        <span className="text-xs opacity-70 ml-2">(edited)</span>
                      )}
                    </div>
                  </div>

                  {/* Message Actions */}
                  {message.senderId === user?.id && !message.isDeleted && (
                    <div className="absolute right-0 top-0 transform translate-x-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => handleEditMessage(message.id, message.content)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="input-enhanced pr-10"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            + Attach
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
