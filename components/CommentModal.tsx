'use client'

import { useState, useEffect, useRef } from 'react'
import { useStore } from '@/lib/store'
import { X, Send, Heart, User, Image, Smile, Paperclip } from 'lucide-react'

interface CommentModalProps {
  postId: string
  isOpen: boolean
  onClose: () => void
}

export default function CommentModal({ postId, isOpen, onClose }: CommentModalProps) {
  const { user, comments, addComment, updateComment } = useStore()
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedAttachment, setSelectedAttachment] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const attachmentInputRef = useRef<HTMLInputElement>(null)

  // Get comments for this post
  const postComments = comments.filter(comment => comment.postId === postId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !user) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const comment = {
        id: Date.now().toString(),
        postId,
        authorId: user.id,
        authorName: user.name,
        authorImage: user.profileImage || '',
        content: newComment.trim(),
        timestamp: new Date(),
        likes: 0,
        imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
        attachmentUrl: selectedAttachment ? URL.createObjectURL(selectedAttachment) : undefined,
        attachmentName: selectedAttachment?.name || undefined
      }

      addComment(comment)
      setNewComment('')
      setSelectedImage(null)
      setSelectedAttachment(null)
      setIsLoading(false)
      onClose() // Close the modal after posting comment
    }, 500)
  }

  const handleLikeComment = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId)
    if (comment) {
      updateComment(commentId, { likes: comment.likes + 1 })
    }
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
    setNewComment(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  const emojis = ['😀', '😂', '😍', '🥰', '😎', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '🚀', '💡', '⭐', '🎯']

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {postComments.length > 0 ? (
            postComments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  {comment.authorImage ? (
                    <img 
                      src={comment.authorImage} 
                      alt={comment.authorName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {comment.authorName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">
                        {comment.authorName}
                      </span>
                      <span className="text-gray-500 text-xs">•</span>
                      <span className="text-gray-500 text-xs">
                        {formatTimeAgo(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm">{comment.content}</p>
                    
                    {/* Comment Image */}
                    {comment.imageUrl && (
                      <div className="mt-3">
                        <img 
                          src={comment.imageUrl} 
                          alt="Comment image" 
                          className="max-w-full h-auto rounded-lg shadow-sm"
                          style={{ maxHeight: '200px' }}
                        />
                      </div>
                    )}
                    
                    {/* Comment Attachment */}
                    {comment.attachmentUrl && comment.attachmentName && (
                      <div className="mt-3 p-2 bg-gray-50 rounded-lg border">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-900">{comment.attachmentName}</p>
                          </div>
                          <a 
                            href={comment.attachmentUrl} 
                            download={comment.attachmentName}
                            className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-2 ml-3">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>

        {/* Comment Input */}
        {user && (
          <div className="border-t p-6">
            {/* Selected Files Preview */}
            {(selectedImage || selectedAttachment) && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {selectedImage && (
                      <div className="flex items-center space-x-2">
                        <Image className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-700">{selectedImage.name}</span>
                      </div>
                    )}
                    {selectedAttachment && (
                      <div className="flex items-center space-x-2">
                        <Paperclip className="w-4 h-4 text-green-500" />
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
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
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

            <form onSubmit={handleSubmitComment} className="space-y-3">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {user.name?.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                    rows={2}
                    disabled={isLoading}
                    style={{ color: '#111827' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || (!newComment.trim() && !selectedImage && !selectedAttachment)}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-4 ml-11">
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
                  className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <Image className="w-4 h-4" />
                  <span className="text-sm">Image</span>
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
                  className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                  <span className="text-sm">File</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 transition-colors"
                >
                  <Smile className="w-4 h-4" />
                  <span className="text-sm">Emoji</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
