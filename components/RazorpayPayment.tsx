'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface RazorpayPaymentProps {
  amount: number
  currency?: string
  orderId: string
  onSuccess: (paymentId: string, signature: string) => void
  onError: (error: string) => void
  onClose: () => void
  studentName: string
  alumniName: string
  sessionHours: number
  hourlyRate: number
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RazorpayPayment({
  amount,
  currency = 'INR',
  orderId,
  onSuccess,
  onError,
  onClose,
  studentName,
  alumniName,
  sessionHours,
  hourlyRate
}: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending')

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
      })
    }

    const initializePayment = async () => {
      setIsLoading(true)
      
      try {
        const scriptLoaded = await loadRazorpayScript()
        if (!scriptLoaded) {
          throw new Error('Failed to load Razorpay script')
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_RGKmqvsB0eeJ2c', // Your Razorpay key
          amount: amount * 100, // Razorpay expects amount in paise
          currency: currency,
          name: 'Alumni Mentoring Platform',
          description: `Mentoring session with ${alumniName}`,
          order_id: orderId,
          prefill: {
            name: studentName,
            email: '', // You can add email if available
            contact: '' // You can add contact if available
          },
          theme: {
            color: '#3B82F6'
          },
          handler: function (response: any) {
            setPaymentStatus('success')
            onSuccess(response.razorpay_payment_id, response.razorpay_signature)
          },
          modal: {
            ondismiss: function() {
              setPaymentStatus('failed')
              onError('Payment cancelled by user')
            }
          }
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } catch (error) {
        console.error('Payment initialization error:', error)
        setPaymentStatus('failed')
        onError(error instanceof Error ? error.message : 'Payment initialization failed')
      } finally {
        setIsLoading(false)
      }
    }

    initializePayment()
  }, [amount, currency, orderId, onSuccess, onError, studentName, alumniName])

  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">
            Your session booking with {alumniName} has been confirmed.
          </p>
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Session Duration:</span>
                <span>{sessionHours} hour(s)</span>
              </div>
              <div className="flex justify-between">
                <span>Rate per hour:</span>
                <span>₹{hourlyRate}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                <span>Total Paid:</span>
                <span>₹{amount}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h3>
          <p className="text-gray-600 mb-4">
            There was an issue processing your payment. Please try again.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
        <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Initializing Payment...</h3>
        <p className="text-gray-600 mb-4">
          Please wait while we set up your payment for the session with {alumniName}.
        </p>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Session Duration:</span>
              <span>{sessionHours} hour(s)</span>
            </div>
            <div className="flex justify-between">
              <span>Rate per hour:</span>
              <span>₹{hourlyRate}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2 mt-2">
              <span>Total Amount:</span>
              <span>₹{amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
