'use client'

import { useRouter } from 'next/navigation'
import { 
  Layout, 
  TrendingUp, 
  Clock, 
  MessageCircle, 
  Heart, 
  Loader, 
  Lock, 
  Globe, 
  Plus, 
  Calendar, 
  User 
} from 'lucide-react'

export default function ComponentsFeatures() {
  const router = useRouter()

  const components = [
    {
      name: 'Admin Layout',
      path: '/components/AdminLayout.tsx',
      description: 'Admin layout component',
      icon: Layout,
      color: 'purple'
    },
    {
      name: 'Career Progress Modal',
      path: '/components/CareerProgressModal.tsx',
      description: 'Career progress modal',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      name: 'Career Timeline',
      path: '/components/CareerTimeline.tsx',
      description: 'Career timeline component',
      icon: Clock,
      color: 'purple'
    },
    {
      name: 'Chat List',
      path: '/components/ChatList.tsx',
      description: 'Chat list component',
      icon: MessageCircle,
      color: 'purple'
    },
    {
      name: 'Chat View',
      path: '/components/ChatView.tsx',
      description: 'Chat view component',
      icon: MessageCircle,
      color: 'purple'
    },
    {
      name: 'Comment Modal',
      path: '/components/CommentModal.tsx',
      description: 'Comment modal component',
      icon: MessageCircle,
      color: 'purple'
    },
    {
      name: 'Donation Modal',
      path: '/components/DonationModal.tsx',
      description: 'Donation modal component',
      icon: Heart,
      color: 'purple'
    },
    {
      name: 'Loading Spinner',
      path: '/components/LoadingSpinner.tsx',
      description: 'Loading spinner component',
      icon: Loader,
      color: 'purple'
    },
    {
      name: 'Login Form',
      path: '/components/LoginForm.tsx',
      description: 'Login form component',
      icon: Lock,
      color: 'purple'
    },
    {
      name: 'Navigation',
      path: '/components/Navigation.tsx',
      description: 'Navigation component',
      icon: Globe,
      color: 'purple'
    },
    {
      name: 'New Chat Modal',
      path: '/components/NewChatModal.tsx',
      description: 'New chat modal component',
      icon: Plus,
      color: 'purple'
    },
    {
      name: 'Razorpay Payment',
      path: '/components/RazorpayPayment.tsx',
      description: 'Payment component',
      icon: Heart,
      color: 'purple'
    },
    {
      name: 'Session Booking Form',
      path: '/components/SessionBookingForm.tsx',
      description: 'Session booking form',
      icon: Calendar,
      color: 'purple'
    },
    {
      name: 'Signup Form',
      path: '/components/SignupForm.tsx',
      description: 'Signup form component',
      icon: User,
      color: 'purple'
    }
  ]

  const handleComponentClick = (component: any) => {
    // Show component information in a modal-like display
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div class="flex items-center mb-4">
          <div class="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">${component.name}</h2>
        </div>
        <p class="text-gray-600 mb-4">${component.description}</p>
        <div class="bg-gray-100 rounded p-3 mb-4">
          <p class="text-sm text-gray-600 font-mono">${component.path}</p>
        </div>
        <div class="flex space-x-3">
          <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
            Close
          </button>
          <button onclick="navigator.clipboard.writeText('${component.path}'); this.textContent='Copied!'; setTimeout(() => this.textContent='Copy Path', 2000)" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
            Copy Path
          </button>
        </div>
      </div>
    `
    document.body.appendChild(modal)
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-500 w-16 h-16 rounded-lg flex items-center justify-center mr-4">
              <Layout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Components</h1>
              <p className="text-lg text-gray-600 mt-2">14 features available</p>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {components.map((component, index) => {
            const IconComponent = component.icon
            return (
              <div
                key={index}
                onClick={() => handleComponentClick(component)}
                className="bg-purple-50 border border-purple-200 rounded-lg p-6 cursor-pointer hover:shadow-md hover:bg-purple-100 transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                    Component
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{component.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                  <div className="bg-gray-100 rounded px-3 py-1 inline-block">
                    <span className="text-xs text-gray-600 font-mono">{component.path}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
