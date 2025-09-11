import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function GET() {
  try {
    console.log('Testing Razorpay configuration...')
    
    const razorpay = new Razorpay({
      key_id: 'rzp_test_RGKmqvsB0eeJ2c',
      key_secret: 'qvDE9fMdb0MwD3HcaVZndxoJ',
    })

    console.log('Razorpay instance created successfully')

    // Test creating a simple order
    const options = {
      amount: 100, // ₹1.00 in paise
      currency: 'INR',
      receipt: `test_${Date.now()}`,
      notes: {
        test: 'true'
      }
    }

    console.log('Creating test order with options:', options)
    const order = await razorpay.orders.create(options)
    
    console.log('Order created successfully:', order)

    return NextResponse.json({
      success: true,
      message: 'Razorpay is working correctly',
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    })

  } catch (error) {
    console.error('Razorpay test error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Razorpay test failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
