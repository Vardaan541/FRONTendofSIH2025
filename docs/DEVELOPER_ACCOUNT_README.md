# Developer Account System

This document describes the developer account system that provides full access to all sections of the Alumni Management Platform.

## Overview

The developer account is a special role that allows access to all features and sections of the platform for development, testing, and debugging purposes.

## Features

### 🔐 Authentication
- **Login Page**: `/developer/login`
- **Credentials**: 
  - Email: `dev@university.edu`
  - Password: `dev123`
- **Session Management**: Uses localStorage for session persistence

### 🏠 Developer Dashboard
- **Main Page**: `/developer`
- **Full Access**: Access to all platform sections
- **Organized Categories**: Features grouped by type for easy navigation

## Available Sections

### Student Features
- Student Dashboard (`/student`)
- Student Profile (`/student/profile`)
- Alumni Network (`/student/alumni`)
- Career AI (`/student/career-ai`)
- Leaderboard (`/student/leaderboard`)
- Messaging (`/student/messaging`)

### Alumni Features
- Alumni Dashboard (`/alumni`)
- Alumni Profile (`/alumni/profile`)
- Career Progress (`/alumni/career-progress`)
- Create Post (`/alumni/create-post`)
- Event Requests (`/alumni/event-requests`)
- Leaderboard (`/alumni/leaderboard`)
- Messaging (`/alumni/messaging`)
- Students (`/alumni/students`)

### Admin Features
- Admin Dashboard (`/admin`)
- Admin Login (`/admin/login`)
- Students Management (`/admin/students`)
- Alumni Management (`/admin/alumni`)
- User Management (`/admin/users`)
- Analytics (`/admin/analytics`)
- Events (`/admin/events`)
- Event Approvals (`/admin/event-approvals`)
- Approvals (`/admin/approvals`)
- Settings (`/admin/settings`)
- Profile (`/admin/profile`)
- Debug (`/admin/debug`)

### API Endpoints
- Auth Login (`/api/auth/login`)
- Auth Signup (`/api/auth/signup`)
- Career AI (`/api/career-ai`)
- Donation (`/api/donation`)
- Payment (`/api/payment`)
- Simple Test (`/api/simple-test`)
- Razorpay Test (`/api/test-razorpay`)

### Testing & Development
- Testing Home (`/testing`)
- Leaderboard Test (`/testing/leaderboard`)
- Test Integration (`/test-integration.html`)

### Components
- All React components in `/components/` directory
- Direct links to component files for easy access

## Quick Actions

The developer dashboard includes quick action buttons for:
- **Test API**: Direct access to API testing endpoints
- **Debug Tools**: Access to admin debug tools
- **Integration Test**: Run integration tests
- **Analytics**: View platform analytics

## Technical Implementation

### Authentication Flow
1. User selects "Developer" role on main page
2. Redirected to `/developer/login`
3. Authenticates with developer credentials
4. Session stored in localStorage
5. Redirected to `/developer` dashboard

### Access Control
- Developer role has access to all routes
- Middleware allows developer routes without Supabase authentication
- Component-level authentication checks for developer role

### Session Management
- Uses `lib/auth.ts` for session management
- Developer sessions persist across browser refreshes
- Logout clears session and redirects to home

## Usage Instructions

1. **Access Developer Portal**:
   - Go to the main page (`/`)
   - Click on "Developer" role card
   - Or navigate directly to `/developer/login`

2. **Login**:
   - Use credentials: `dev@university.edu` / `dev123`
   - Click "Access Developer Portal"

3. **Navigate Features**:
   - Browse sections by category
   - Click any feature to access it
   - External links open in new tabs
   - API endpoints and components open in new tabs

4. **Quick Actions**:
   - Use quick action buttons for common tasks
   - Test APIs, access debug tools, view analytics

5. **Logout**:
   - Click logout button in header
   - Returns to main page

## Security Notes

- Developer account is for development/testing only
- Should not be used in production
- Full access to all platform features
- No restrictions on data access or modifications

## Development Benefits

- **Complete Access**: Test all features without role switching
- **Easy Navigation**: Organized interface for quick access
- **API Testing**: Direct links to all API endpoints
- **Component Access**: View and test all React components
- **Debug Tools**: Access to admin debug features
- **Integration Testing**: Run comprehensive tests

This developer account system provides a comprehensive testing and development environment for the Alumni Management Platform.
