'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import Navigation from '@/components/Navigation'
import { Send, Image, Link, Smile, ArrowLeft, Paperclip, X } from 'lucide-react'

export default function CreatePost() {
  const { user, addPost, updateUserStats } = useStore()
  const router = useRouter()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedAttachment, setSelectedAttachment] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const attachmentInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Allow access even without authentication for demo purposes
    // if (!user || user.role !== 'alumni') {
    //   router.push('/')
    //   return
    // }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        authorId: user?.id || '1',
        authorName: user?.name || 'Alumni User',
        authorImage: user?.profileImage || '',
        content: content.trim(),
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
        attachmentUrl: selectedAttachment ? URL.createObjectURL(selectedAttachment) : undefined,
        attachmentName: selectedAttachment?.name || undefined
      }

      addPost(newPost)
      
      // Simulate gaining followers when posting (random 1-3 followers)
      const newFollowers = Math.floor(Math.random() * 3) + 1
      if (user?.id) {
        updateUserStats(user?.id, {
          followers: (user?.followers || 0) + newFollowers
        })
      }
      
      setContent('')
      setSelectedImage(null)
      setSelectedAttachment(null)
      setIsLoading(false)
      router.push('/alumni')
    }, 1000)
  }

  const handleBack = () => {
    router.push('/alumni')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
    }
  }

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedAttachment(file)
    }
  }

  const addEmoji = (emoji: string) => {
    setContent(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  const emojis = ['😀', '😂', '😍', '🥰', '😎', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '🚀', '💡', '⭐', '🎯']

  // Allow access even without authentication for demo purposes
  // if (!user || user.role !== 'alumni') {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userRole="alumni" />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600 mt-2">Share your insights and experiences with the community</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit}>
            {/* Post Header */}
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user?.name || 'Alumni'}</h3>
                  <p className="text-sm text-gray-600">{user?.currentPosition || 'Software Engineer'} at {user?.company || 'Tech Corp'}</p>
                </div>
              </div>
            </div>

            {/* Selected Files Preview */}
            {(selectedImage || selectedAttachment) && (
              <div className="p-6 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {selectedImage && (
                      <div className="flex items-center space-x-2">
                        <Image className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-700">{selectedImage.name}</span>
                      </div>
                    )}
                    {selectedAttachment && (
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-700">{selectedAttachment.name}</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null)
                      setSelectedAttachment(null)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="p-6 border-b bg-gray-50">
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addEmoji(emoji)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Post Content */}
            <div className="p-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind? Share career insights, experiences, or advice for students..."
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white h-48"
                disabled={isLoading}
                style={{ color: '#111827' }}
              />
            </div>

            {/* Post Actions */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    <Image className="w-5 h-5" />
                  </button>

                  <input
                    ref={attachmentInputRef}
                    type="file"
                    onChange={handleAttachmentUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => attachmentInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2 text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">
                    {content.length}/500
                  </span>
                  <button
                    type="submit"
                    disabled={isLoading || (!content.trim() && !selectedImage && !selectedAttachment) || content.length > 500}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Post</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Posting Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Great Posts</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Share specific experiences and lessons learned</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Provide actionable advice for students</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Use hashtags to categorize your content</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Be authentic and share both successes and challenges</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Encourage engagement by asking questions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
