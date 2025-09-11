// Test script to verify Razorpay API keys
const Razorpay = require('razorpay');

async function testRazorpayKeys() {
  console.log('Testing Razorpay API Keys...\n');
  
  const razorpay = new Razorpay({
    key_id: 'rzp_test_RGKmqvsB0eeJ2c',
    key_secret: 'qvDE9fMdb0MwD3HcaVZndxoJ',
  });

  try {
    // Test creating a simple order
    const options = {
      amount: 100, // ₹1.00 in paise
      currency: 'INR',
      receipt: `test_${Date.now()}`,
      notes: {
        test: 'true'
      }
    };

    console.log('Creating test order...');
    const order = await razorpay.orders.create(options);
    
    console.log('✅ Razorpay API keys are working correctly!');
    console.log('Order created:', {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt
    });
    
  } catch (error) {
    console.log('❌ Razorpay API keys test failed:');
    console.log('Error:', error.message);
    console.log('Status Code:', error.statusCode);
    console.log('Error Details:', error.error);
    
    if (error.statusCode === 401) {
      console.log('\n🔧 Possible solutions:');
      console.log('1. Check if your API keys are correct');
      console.log('2. Ensure you are using test keys (not live keys)');
      console.log('3. Verify your Razorpay account is active');
    }
  }
}

// Run the test
testRazorpayKeys();
