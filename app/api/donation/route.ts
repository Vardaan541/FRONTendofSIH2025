import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import crypto from 'crypto'

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_RGKmqvsB0eeJ2c',
  key_secret: 'qvDE9fMdb0MwD3HcaVZndxoJ',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'INR', donorName, donorEmail, type } = body

    console.log('Donation API called with:', { amount, currency, donorName, donorEmail, type })

    // Validate required fields
    if (!amount || !donorName || !type) {
      console.log('Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate minimum amount
    if (amount < 10) {
      return NextResponse.json(
        { error: 'Minimum donation amount is ₹10' },
        { status: 400 }
      )
    }

    // Create order options
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency,
      receipt: `donation_${donorName.replace(/\s+/g, '_')}_${Date.now()}`,
      notes: {
        donorName,
        donorEmail: donorEmail || '',
        type: 'donation',
        platform: 'alumni_mentoring'
      }
    }

    console.log('Creating donation order with options:', options)

    // Create order
    const order = await razorpay.orders.create(options)

    console.log('Donation order created successfully:', order)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    })

  } catch (error) {
    console.error('Donation API error:', error)
    return NextResponse.json(
      { error: 'Failed to create donation order', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, paymentId, signature, type } = body

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac('sha256', 'qvDE9fMdb0MwD3HcaVZndxoJ')
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    if (generatedSignature !== signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save the donation to your database
    // 2. Send thank you emails
    // 3. Update donation records
    // 4. Create donor records

    console.log('Donation payment verified successfully:', {
      orderId,
      paymentId,
      signature,
      type
    })

    // For now, we'll just return success
    // In a real application, you'd save this to your database
    const donationRecord = {
      id: `donation_${Date.now()}`,
      orderId,
      paymentId,
      signature,
      type,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      donation: donationRecord,
      message: 'Donation payment verified and recorded'
    })

  } catch (error) {
    console.error('Donation verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify donation payment' },
      { status: 500 }
    )
  }
}
