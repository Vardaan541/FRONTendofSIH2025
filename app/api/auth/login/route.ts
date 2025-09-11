import { NextRequest, NextResponse } from 'next/server'

// In a real application, you would use a proper database
// For now, we'll use a simple in-memory store
// This should be the same store as in signup route
const users: any[] = [
  // Sample users for testing
  {
    id: 'demo_student_1',
    name: 'John Student',
    email: 'student@university.edu',
    password: 'student123',
    phone: '+1234567890',
    department: 'Computer Science',
    bio: 'Computer Science Student passionate about AI and Machine Learning',
    role: 'student',
    studentId: 'CS2024001',
    graduationYear: 2025,
    currentSemester: '5th Semester',
    followers: 0,
    following: 0,
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'demo_alumni_1',
    name: 'Jane Alumni',
    email: 'alumni@university.edu',
    password: 'alumni123',
    phone: '+1234567891',
    department: 'Computer Science',
    bio: 'Software Engineer at Tech Corp with 5 years of experience',
    role: 'alumni',
    graduationYear: 2020,
    currentPosition: 'Senior Software Engineer',
    company: 'Tech Corp',
    experience: 5,
    linkedinProfile: 'https://linkedin.com/in/janealumni',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    followers: 150,
    following: 0,
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    id: 'demo_admin_1',
    name: 'Admin User',
    email: 'admin@university.edu',
    password: 'admin123',
    phone: '+1234567892',
    department: 'Administration',
    bio: 'Platform Administrator',
    role: 'admin',
    followers: 0,
    following: 0,
    createdAt: new Date().toISOString(),
    isActive: true
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, role } = body
    
    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = users.find(u => u.email === email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check password (in production, compare hashed passwords)
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 401 }
      )
    }

    // Check role if specified
    if (role && user.role !== role) {
      return NextResponse.json(
        { error: `Access denied. This account is for ${user.role}s, not ${role}s` },
        { status: 403 }
      )
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user
    
    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
