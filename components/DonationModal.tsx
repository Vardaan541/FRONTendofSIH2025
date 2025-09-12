'use client'

import { useState } from 'react'
import { X, Heart, CreditCard, Smartphone, Gift } from 'lucide-react'

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  donorName: string
  donorEmail: string
}

export default function DonationModal({ isOpen, onClose, donorName, donorEmail }: DonationModalProps) {
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState('')

  const predefinedAmounts = ['100', '250', '500', '1000', '2500', '5000']

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount)
    setAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setAmount(value)
    setSelectedAmount('')
  }

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) < 10) {
      alert('Please enter a valid amount (minimum ₹10)')
      return
    }

    setIsLoading(true)

    try {
      // Create donation order
      const response = await fetch('/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: 'INR',
          donorName,
          donorEmail,
          type: 'donation'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create donation order')
      }

      // Initialize Razorpay
      const options = {
        key: 'rzp_test_RGKmqvsB0eeJ2c',
        amount: data.amount,
        currency: data.currency,
        name: 'Alumni Mentoring Platform',
        description: 'Support our platform',
        order_id: data.orderId,
        handler: function (response: any) {
          alert('Thank you for your donation! Your support helps us maintain and improve the platform.')
          onClose()
          setAmount('')
          setCustomAmount('')
          setSelectedAmount('')
        },
        prefill: {
          name: donorName,
          email: donorEmail,
        },
        theme: {
          color: '#3B82F6',
        },
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()

    } catch (error) {
      console.error('Donation error:', error)
      alert('Failed to process donation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Support Our Platform</h2>
              <p className="text-sm text-gray-600">Help us maintain and improve the alumni mentoring platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Donation Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Donation Amount
            </label>
            
            {/* Predefined Amounts */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                    selectedAmount === amount
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-semibold">₹{amount}</div>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="relative">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="Enter custom amount"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                min="10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 text-sm">₹</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Minimum donation amount is ₹10</p>
          </div>

          {/* Donor Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Donor Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="text-gray-900">{donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{donorEmail || 'Not provided'}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-700">Credit/Debit Card</span>
              </div>
              <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <Smartphone className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">UPI, Net Banking, Wallets</span>
              </div>
            </div>
          </div>

          {/* Donation Impact */}
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
            <div className="flex items-center space-x-2 mb-2">
              <Gift className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-gray-900">Your Impact</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your donation helps us maintain server costs, develop new features, and provide 
              better support to students and alumni using our platform.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-500">
            Secure payment powered by Razorpay
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDonate}
              disabled={!amount || parseFloat(amount) < 10 || isLoading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  <span>Donate ₹{amount || '0'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}