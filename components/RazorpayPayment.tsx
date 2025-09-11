'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface RazorpayPaymentProps {
  orderData: {
    orderId: string
    amount: number
    currency: string
  }
  sessionData: {
    studentId: string
    studentName: string
    alumniId: string
    alumniName: string
    hours: number
    amount: number
    message: string
  }
  onSuccess: (sessionRequest: any) => void
  onError: (error: string) => void
  onClose: () => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RazorpayPayment({
  orderData,
  sessionData,
  onSuccess,
  onError,
  onClose,
}: RazorpayPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending')

  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
      })
    }

    const initializePayment = async () => {
      const res = await loadRazorpay()
      if (!res) {
        onError('Failed to load Razorpay SDK')
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Alumni Mentoring Platform',
        description: `Session with ${sessionData.alumniName} for ${sessionData.hours} hour(s)`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          setIsLoading(true)
          try {
            const verifyResponse = await fetch('/api/payment', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                sessionData,
              }),
            })

            const result = await verifyResponse.json()

            if (result.success) {
              setPaymentStatus('success')
              onSuccess(result.sessionRequest)
            } else {
              setPaymentStatus('error')
              onError(result.error || 'Payment verification failed')
            }
          } catch (error) {
            setPaymentStatus('error')
            onError('Payment verification failed')
          } finally {
            setIsLoading(false)
          }
        },
        prefill: {
          name: sessionData.studentName,
          email: '', // You might want to get this from user data
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: () => {
            onClose()
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    }

    initializePayment()
  }, [orderData, sessionData, onSuccess, onError, onClose])

  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Your session request has been sent to {sessionData.alumniName}. 
              You will be notified once they respond.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (paymentStatus === 'error') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Failed
            </h3>
            <p className="text-gray-600 mb-6">
              There was an error processing your payment. Please try again.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Verifying Payment...
            </h3>
            <p className="text-gray-600">
              Please wait while we verify your payment.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Opening Payment Gateway...
          </h3>
          <p className="text-gray-600">
            Please wait while we redirect you to the payment page.
          </p>
        </div>
      </div>
    </div>
  )
}
