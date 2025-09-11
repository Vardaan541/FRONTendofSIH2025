# Razorpay Integration Setup

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

## Getting Razorpay Credentials

1. Sign up for a Razorpay account at https://razorpay.com
2. Go to Settings > API Keys
3. Generate API keys for your application
4. Copy the Key ID and Key Secret
5. Add them to your `.env.local` file

## Testing

For testing purposes, you can use Razorpay's test mode:
- Use test API keys
- Test card numbers are available in Razorpay documentation
- No real money will be charged in test mode

## Production Setup

1. Switch to live mode in Razorpay dashboard
2. Generate live API keys
3. Update environment variables with live keys
4. Ensure your domain is whitelisted in Razorpay settings
