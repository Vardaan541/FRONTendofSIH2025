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
    const { amount, currency = 'INR', studentId, alumniId, sessionData } = body

    console.log('Payment API called with:', { amount, currency, studentId, alumniId })

    // Validate required fields
    if (!amount || !studentId || !alumniId || !sessionData) {
      console.log('Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create order options
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency,
      receipt: `session_${studentId}_${alumniId}_${Date.now()}`,
      notes: {
        studentId,
        alumniId,
        sessionData: JSON.stringify(sessionData),
        type: 'mentoring_session'
      }
    }

    console.log('Creating order with options:', options)

    // Create order
    const order = await razorpay.orders.create(options)

    console.log('Order created successfully:', order)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    })

  } catch (error) {
    console.error('Payment API error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, paymentId, signature, sessionData } = body

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
    // 1. Save the booking to your database
    // 2. Send confirmation emails
    // 3. Update user records
    // 4. Create calendar events

    console.log('Payment verified successfully:', {
      orderId,
      paymentId,
      signature,
      sessionData
    })

    // For now, we'll just return success
    // In a real application, you'd save this to your database
    const bookingRecord = {
      id: `booking_${Date.now()}`,
      orderId,
      paymentId,
      signature,
      sessionData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      booking: bookingRecord,
      message: 'Payment verified and booking confirmed'
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
