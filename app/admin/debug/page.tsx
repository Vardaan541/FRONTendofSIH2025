'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function AdminDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const userData = localStorage.getItem('adminUser')
    const parsedUser = userData ? JSON.parse(userData) : null
    
    setDebugInfo({
      hasLocalStorage: !!userData,
      userData: parsedUser,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      localStorageKeys: Object.keys(localStorage)
    })
  }, [])

  const clearAuth = () => {
    localStorage.removeItem('adminUser')
    window.location.reload()
  }

  const setTestUser = () => {
    const testUser = {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@college.edu',
      role: 'admin',
      college: 'University of Technology',
      lastLogin: new Date().toISOString()
    }
    localStorage.setItem('adminUser', JSON.stringify(testUser))
    window.location.reload()
  }

  return (
    <AdminLayout>
      <div className="px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Debug Page</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Authentication Debug Info</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="space-x-4">
              <button
                onClick={setTestUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Set Test User
              </button>
              <button
                onClick={clearAuth}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Clear Auth
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Refresh Page
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <div className="space-x-4">
              <a href="/admin" className="text-blue-600 hover:text-blue-800 underline">
                Go to Dashboard
              </a>
              <a href="/admin/login" className="text-blue-600 hover:text-blue-800 underline">
                Go to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
