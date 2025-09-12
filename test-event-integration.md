# Event Request Integration Test

## Overview
This document describes the integration between the alumni event request submission and admin event approval system.

## Integration Flow

### 1. Alumni Event Request Submission
- **Location**: `/alumni/event-requests`
- **Process**: Alumni can submit event requests through the form
- **Data Storage**: Requests are stored in the shared Zustand store
- **Structure**: EventRequest interface with details object

### 2. Admin Event Approval Management
- **Location**: `/admin/event-approvals`
- **Process**: Admins can view, approve, or reject event requests
- **Data Source**: Same shared Zustand store as alumni submissions
- **Features**: 
  - Filter by status, priority, and type
  - Search functionality
  - Detailed approval modal with admin modifications
  - Real-time status updates

### 3. Shared State Management
- **Store**: `lib/store.ts`
- **Interface**: `EventRequest` with standardized structure
- **Functions**: 
  - `addEventRequest()` - Add new requests
  - `updateEventRequest()` - Update request status
  - `deleteEventRequest()` - Remove requests

## Test Scenarios

### Scenario 1: New Event Request Submission
1. Navigate to `/alumni/event-requests`
2. Click "Create Event Request"
3. Fill out the form with event details
4. Submit the request
5. Verify the request appears in the list with "pending" status

### Scenario 2: Admin Approval Process
1. Navigate to `/admin/event-approvals`
2. View the submitted event request
3. Click "Approve Event" button
4. Modify admin settings (capacity, price, status, notes)
5. Submit approval
6. Verify status changes to "approved"

### Scenario 3: Real-time Updates
1. Submit a new event request as alumni
2. Open admin event approvals page in another tab
3. Verify the new request appears immediately
4. Approve/reject the request as admin
5. Check alumni page to see status update

## Data Structure

```typescript
interface EventRequest {
  id: string
  title: string
  description: string
  submittedBy: string
  submittedDate: string
  status: 'pending' | 'approved' | 'rejected'
  priority: 'low' | 'medium' | 'high'
  collegeId: string
  details: {
    eventName: string
    date: string
    time: string
    venue: string
    expectedAttendees: number
    budget: number
    type: 'networking' | 'workshop' | 'conference' | 'reunion' | 'social'
    contactEmail: string
    contactPhone?: string
    organizer: string
  }
}
```

## Key Features

### Alumni Side
- ✅ Event request form with validation
- ✅ View submitted requests with status
- ✅ Real-time status updates
- ✅ User-specific request filtering

### Admin Side
- ✅ Comprehensive event request dashboard
- ✅ Advanced filtering and search
- ✅ Detailed approval modal with admin controls
- ✅ Status management (approve/reject)
- ✅ Admin notes and modifications

### Integration
- ✅ Shared state management
- ✅ Real-time synchronization
- ✅ Consistent data structure
- ✅ Seamless user experience

## Testing Instructions

1. **Start the development server**: `npm run dev`
2. **Access alumni page**: `http://localhost:3003/alumni/event-requests`
3. **Access admin page**: `http://localhost:3003/admin/event-approvals`
4. **Test the complete flow** as described in the scenarios above

## Notes

- The integration uses Zustand for state management
- All data is currently stored in memory (mock data)
- In production, this would connect to a backend API
- The system supports multiple event types and priorities
- Admin can modify event details during approval process
