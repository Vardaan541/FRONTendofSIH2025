import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Simple test API called with:', body)
    
    return NextResponse.json({
      success: true,
      message: 'Simple test API is working',
      receivedData: body
    })
  } catch (error) {
    console.error('Simple test error:', error)
    return NextResponse.json(
      { error: 'Simple test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
