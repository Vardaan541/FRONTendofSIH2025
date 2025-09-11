import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import crypto from 'crypto'

// Initialize Razorpay instance (only if environment variables are available)
let razorpay: Razorpay | null = null

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

export async function POST(request: NextRequest) {
  try {
    if (!razorpay) {
      return NextResponse.json(
        { error: 'Payment service not configured. Please set up Razorpay environment variables.' },
        { status: 503 }
      )
    }

    const { amount, currency = 'INR', sessionData } = await request.json()

    if (!amount || !sessionData) {
      return NextResponse.json(
        { error: 'Amount and session data are required' },
        { status: 400 }
      )
    }

    // Create order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `session_${Date.now()}`,
      notes: {
        studentId: sessionData.studentId,
        alumniId: sessionData.alumniId,
        hours: sessionData.hours,
        message: sessionData.message,
      },
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Payment order creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!razorpay || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment service not configured. Please set up Razorpay environment variables.' },
        { status: 503 }
      )
    }

    const { orderId, paymentId, signature, sessionData } = await request.json()

    if (!orderId || !paymentId || !signature || !sessionData) {
      return NextResponse.json(
        { error: 'Missing required payment verification data' },
        { status: 400 }
      )
    }

    // Verify payment signature
    const body = orderId + '|' + paymentId
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Payment verified successfully
    // Here you would typically:
    // 1. Save the session request to database
    // 2. Send notification to alumni
    // 3. Update payment status

    return NextResponse.json({
      success: true,
      message: 'Payment verified and session request created',
      sessionRequest: {
        id: `session_${Date.now()}`,
        studentId: sessionData.studentId,
        alumniId: sessionData.alumniId,
        hours: sessionData.hours,
        amount: sessionData.amount,
        message: sessionData.message,
        status: 'pending',
        timestamp: new Date(),
      },
    })
  } catch (error) {
    console.error('Payment verification failed:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
