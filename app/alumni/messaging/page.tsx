'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore, Chat } from '@/lib/store'
import Navigation from '@/components/Navigation'
import ChatList from '@/components/ChatList'
import ChatView from '@/components/ChatView'

export default function AlumniMessaging() {
  const { user } = useStore()
  const router = useRouter()
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  useEffect(() => {
    // Allow access even without authentication for demo purposes
    // if (!user || user.role !== 'alumni') {
    //   router.push('/')
    //   return
    // }
  }, [user, router])

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
  }

  // Allow access even without authentication for demo purposes
  // if (!user || user.role !== 'alumni') {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="alumni" />
      
      <div className="flex h-[calc(100vh-64px)]">
        <ChatList 
          onChatSelect={handleChatSelect}
          selectedChatId={selectedChat?.id}
        />
        <ChatView chat={selectedChat} />
      </div>
    </div>
  )
}
