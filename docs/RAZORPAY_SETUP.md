# Razorpay Integration Setup Guide

This guide will help you set up Razorpay payment integration for the alumni mentoring platform.

## Prerequisites

1. Razorpay account (sign up at https://razorpay.com)
2. Node.js 18+ installed
3. Next.js project set up

## Setup Steps

### 1. Install Dependencies

The Razorpay dependency is already included in the project. If you need to install it manually:

```bash
npm install razorpay
```

### 2. Get Razorpay API Keys

1. Log in to your Razorpay Dashboard
2. Go to Settings > API Keys
3. Generate API Keys (use Test keys for development)
4. Copy your Key ID and Key Secret

### 3. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_RGKmqvsB0eeJ2c
RAZORPAY_KEY_SECRET=qvDE9fMdb0MwD3HcaVZndxoJ

# Next.js Public Environment Variables
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RGKmqvsB0eeJ2c
```

**Important:** 
- Your Razorpay keys are already configured in the code
- The keys are: `rzp_test_RGKmqvsB0eeJ2c` (Key ID) and `qvDE9fMdb0MwD3HcaVZndxoJ` (Key Secret)
- Never commit your `.env.local` file to version control

### 4. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the student alumni page
3. Click "Book Session" on any alumni
4. Fill out the comprehensive booking form
5. Proceed to payment

### 5. Features Included

The booking system now includes:

#### Session Details Collection
- Session date and time
- Session duration (1-8 hours)
- Message to alumni

#### Student Profile Information
- Full name and email
- Phone number
- Student ID
- Department and current semester
- Expected graduation year
- Bio and background

#### Session Goals & Expectations
- Specific goals for the session
- Expectations from the mentoring
- Preferred communication method
- Previous mentoring experience

#### Payment Integration
- Razorpay payment gateway
- Secure payment processing
- Payment verification
- Booking confirmation

### 6. Production Setup

For production deployment:

1. Switch to Live API keys in Razorpay Dashboard
2. Update environment variables with live keys
3. Ensure HTTPS is enabled
4. Set up webhook endpoints for payment notifications
5. Implement proper error handling and logging

### 7. Customization

You can customize the booking form by modifying:
- `components/SessionBookingForm.tsx` - Main booking form
- `components/RazorpayPayment.tsx` - Payment component
- `app/api/payment/route.ts` - Payment API endpoints

### 8. Security Considerations

- Always validate payment signatures on the server
- Store sensitive data securely
- Use HTTPS in production
- Implement proper error handling
- Log payment events for audit trails

### 9. Testing

Use Razorpay's test cards for testing:
- Success: 4111 1111 1111 1111
- Failure: 4000 0000 0000 0002
- CVV: Any 3 digits
- Expiry: Any future date

### 10. Support

For issues with:
- Razorpay integration: Check Razorpay documentation
- Booking form: Review component code
- Payment processing: Check API logs and network requests

## File Structure

```
├── components/
│   ├── SessionBookingForm.tsx    # Main booking form
│   └── RazorpayPayment.tsx       # Payment component
├── app/
│   └── api/
│       └── payment/
│           └── route.ts          # Payment API endpoints
└── RAZORPAY_SETUP.md            # This setup guide
```

## Next Steps

1. Set up your Razorpay account and get API keys
2. Configure environment variables
3. Test the booking flow
4. Customize the form fields as needed
5. Deploy to production with live keys
