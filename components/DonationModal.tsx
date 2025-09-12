'use client'

import { useState } from 'react'
import { Heart, X, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  donorName: string
  donorEmail?: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function DonationModal({
  isOpen,
  onClose,
  donorName,
  donorEmail = ''
}: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending')
  const [paymentId, setPaymentId] = useState('')

  const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000]

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    // Validate input - only allow numbers and prevent extremely large values
    const numericValue = value.replace(/[^0-9]/g, '')
    const amount = parseFloat(numericValue)
    
    // Set maximum limit to prevent Razorpay errors
    if (amount > 100000) {
      return // Don't allow amounts over ₹1,00,000
    }
    
    setCustomAmount(numericValue)
    setSelectedAmount(null)
  }

  const getFinalAmount = () => {
    if (selectedAmount) return selectedAmount
    if (customAmount) return parseFloat(customAmount) || 0
    return 0
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleDonate = async () => {
    const amount = getFinalAmount()
    if (amount < 10) {
      alert('Minimum donation amount is ₹10')
      return
    }
    if (amount > 100000) {
      alert('Maximum donation amount is ₹1,00,000')
      return
    }

    setIsLoading(true)
    setPaymentStatus('pending')

    try {
      // Create order on backend
      const orderResponse = await fetch('/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          donorName,
          donorEmail,
          type: 'donation'
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create donation order')
      }

      const orderData = await orderResponse.json()

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script')
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_RGKmqvsB0eeJ2c',
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Alumni Mentoring Platform',
        description: 'Donation to support the platform',
        order_id: orderData.orderId,
        prefill: {
          name: donorName,
          email: donorEmail,
        },
        theme: {
          color: '#EF4444' // Red theme for donations
        },
        handler: function (response: any) {
          setPaymentId(response.razorpay_payment_id)
          setPaymentStatus('success')
          // Verify payment on backend
          verifyPayment(orderData.orderId, response.razorpay_payment_id, response.razorpay_signature)
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus('failed')
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Donation error:', error)
      setPaymentStatus('failed')
    } finally {
      setIsLoading(false)
    }
  }

  const verifyPayment = async (orderId: string, paymentId: string, signature: string) => {
    try {
      await fetch('/api/donation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          paymentId,
          signature,
          type: 'donation'
        }),
      })
    } catch (error) {
      console.error('Payment verification error:', error)
    }
  }

  const resetModal = () => {
    setSelectedAmount(null)
    setCustomAmount('')
    setPaymentStatus('pending')
    setPaymentId('')
    setIsLoading(false)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (!isOpen) return null

  if (paymentStatus === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You for Your Donation!</h3>
          <p className="text-gray-600 mb-4">
            Your generous contribution of ₹{getFinalAmount()} will help support our platform and community.
          </p>
          {paymentId && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="text-sm text-gray-600">
                Payment ID: {paymentId}
              </p>
            </div>
          )}
          <button
            onClick={handleClose}
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
          <h3 className="text-xl font-bold text-gray-900 mb-2">Donation Failed</h3>
          <p className="text-gray-600 mb-4">
            There was an issue processing your donation. Please try again.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setPaymentStatus('pending')}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-bold text-gray-900">Support Our Platform</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Your donation helps us maintain and improve the alumni mentoring platform, 
            connecting students with experienced professionals.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Donation Amount
            </label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                    selectedAmount === amount
                      ? 'border-red-500 bg-red-100 text-red-700 shadow-lg'
                      : 'border-gray-200 hover:border-red-300 hover:bg-red-50 hover:shadow-md'
                  }`}
                >
                  <span className="font-bold text-lg">₹{amount.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or enter custom amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
              <input
                type="number"
                min="10"
                step="1"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="Enter amount (e.g., 100)"
                className="w-full pl-8 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 text-gray-900 font-medium focus:bg-red-50"
                style={{ fontSize: '16px' }}
              />
              {customAmount && (
                <button
                  onClick={() => setCustomAmount('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum amount: ₹10 • Maximum amount: ₹1,00,000</p>
            {customAmount && (
              <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-200">
                <p className="text-sm text-blue-700 font-medium">
                  💰 You entered: ₹{parseFloat(customAmount).toLocaleString()}
                </p>
                {parseFloat(customAmount) >= 1000 && (
                  <p className="text-xs text-green-600 mt-1">
                    ✨ Generous donation! Thank you!
                  </p>
                )}
              </div>
            )}
          </div>

          {getFinalAmount() > 0 && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg mb-4 border-2 border-red-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 text-lg">Total Donation:</span>
                <span className="text-2xl font-bold text-red-600">₹{getFinalAmount().toLocaleString()}</span>
              </div>
              {getFinalAmount() >= 1000 && (
                <p className="text-sm text-green-600 mt-2 font-medium">
                  🎉 Thank you for your generous donation!
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDonate}
            disabled={getFinalAmount() < 10 || isLoading}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                <span>Donate ₹{getFinalAmount().toLocaleString()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
