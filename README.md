# Alumni Management Platform

A comprehensive digital platform for centralized alumni data management and engagement, built with Next.js, React, and TypeScript.

## Features

### 🎓 Student Features
- **Profile Management**: Complete student profile with academic information
- **Alumni Network**: Browse and connect with alumni from your institution
- **Session Booking**: Book paid mentoring sessions with alumni
- **Career AI Assistant**: Get personalized career guidance and insights
- **Posts Feed**: View posts and insights shared by alumni
- **Leaderboard**: See top-performing alumni based on community engagement

### 👨‍💼 Alumni Features
- **Profile Management**: Professional profile with career information
- **Student Connections**: View and manage student mentoring requests
- **Session Management**: Accept/reject mentoring session requests
- **Content Creation**: Create and share posts with the community
- **Performance Tracking**: View your impact and engagement metrics
- **Leaderboard**: Compete with other alumni for top positions

### 🔐 Authentication & Roles
- **Role-based Access**: Separate dashboards for Students, Alumni, and Admins
- **Secure Navigation**: Role-specific navigation and permissions
- **Profile Management**: Comprehensive profile editing capabilities

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alumni-management-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── student/           # Student-specific pages
│   │   ├── page.tsx       # Student dashboard
│   │   ├── profile/       # Student profile
│   │   ├── alumni/        # Alumni network
│   │   ├── career-ai/     # Career AI assistant
│   │   └── leaderboard/   # Alumni leaderboard
│   ├── alumni/            # Alumni-specific pages
│   │   ├── page.tsx       # Alumni dashboard
│   │   ├── profile/       # Alumni profile
│   │   ├── students/      # Student management
│   │   ├── create-post/   # Post creation
│   │   └── leaderboard/   # Alumni leaderboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   └── Navigation.tsx     # Navigation component
├── lib/                   # Utilities and stores
│   └── store.ts          # Zustand store
└── public/               # Static assets
```

## Key Features Implementation

### 1. Role Selection & Authentication
- Landing page with role selection (Student/Alumni/Admin)
- Mock authentication system with role-based routing
- Persistent user state management

### 2. Student Dashboard
- **Profile Section**: Complete student profile with academic information
- **MyAlumni Section**: Browse alumni, follow them, and book mentoring sessions
- **Career AI**: Interactive AI assistant for career guidance
- **Posts Feed**: View alumni posts and insights
- **Leaderboard**: Top alumni based on followers and engagement

### 3. Alumni Dashboard
- **Profile Section**: Professional profile with career information
- **MyStudents Section**: Manage student requests and connections
- **Post Creation**: Create and share content with the community
- **Session Management**: Accept/reject mentoring requests
- **Performance Metrics**: Track engagement and impact

### 4. Session Booking System
- Students can book paid sessions with alumni
- Alumni can accept/reject session requests
- Hourly rate system with total cost calculation
- Session request management with status tracking

### 5. Content Management
- Alumni can create posts with rich text
- Post feed for students to view alumni insights
- Like, comment, and share functionality (UI ready)
- Post creation with character limits and validation

### 6. Leaderboard System
- Multiple sorting options (followers, rating, sessions)
- Visual ranking with icons and colors
- Comprehensive statistics and metrics
- Real-time updates (simulated)

## Mock Data

The application includes comprehensive mock data for:
- User profiles (students and alumni)
- Session requests and bookings
- Posts and content
- Leaderboard rankings
- Career AI responses

## Future Enhancements

- **Real Authentication**: Implement proper authentication system
- **Database Integration**: Connect to a real database
- **Payment Processing**: Integrate payment gateway for session bookings
- **Real-time Features**: WebSocket integration for live updates
- **Admin Panel**: Complete admin dashboard for platform management
- **Mobile App**: React Native mobile application
- **Advanced AI**: More sophisticated career guidance AI
- **Video Integration**: Video calling for mentoring sessions
- **Analytics**: Comprehensive analytics and reporting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
