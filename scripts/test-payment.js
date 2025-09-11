// Test script for payment API
const fetch = require('node-fetch');

async function testPaymentAPI() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('Testing Payment API...\n');
  
  try {
    // Test order creation
    console.log('1. Testing order creation...');
    const orderResponse = await fetch(`${baseUrl}/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 1000, // ₹10.00
        currency: 'INR',
        studentId: 'student_123',
        alumniId: 'alumni_456',
        sessionData: {
          sessionHours: 1,
          sessionDate: '2024-01-15',
          sessionTime: '14:00',
          studentName: 'Test Student',
          studentEmail: 'test@example.com'
        }
      }),
    });

    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      console.log('✅ Order created successfully:', orderData);
      
      // Test payment verification (mock)
      console.log('\n2. Testing payment verification...');
      const verifyResponse = await fetch(`${baseUrl}/api/payment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
          paymentId: 'pay_test_123456789',
          signature: 'test_signature',
          sessionData: {
            sessionHours: 1,
            sessionDate: '2024-01-15',
            sessionTime: '14:00',
            studentName: 'Test Student',
            studentEmail: 'test@example.com'
          }
        }),
      });

      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        console.log('✅ Payment verification successful:', verifyData);
      } else {
        console.log('❌ Payment verification failed:', await verifyResponse.text());
      }
    } else {
      console.log('❌ Order creation failed:', await orderResponse.text());
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testPaymentAPI();
