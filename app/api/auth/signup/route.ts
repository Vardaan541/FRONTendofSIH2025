import { NextRequest, NextResponse } from 'next/server'
import { SignupData } from '@/components/SignupForm'

// In a real application, you would use a proper database
// For now, we'll use a simple in-memory store
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
    const body: SignupData = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'password', 'phone', 'department']
    const missingFields = requiredFields.filter(field => !body[field as keyof SignupData])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === body.email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (body.password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Validate password confirmation
    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    // Role-specific validation (role is passed separately in the request)
    const role = request.nextUrl.searchParams.get('role') as 'student' | 'alumni'
    
    if (role === 'student') {
      if (!body.studentId || !body.currentSemester) {
        return NextResponse.json(
          { error: 'Student ID and current semester are required for students' },
          { status: 400 }
        )
      }
    } else if (role === 'alumni') {
      if (!body.currentPosition || !body.company || body.experience === undefined) {
        return NextResponse.json(
          { error: 'Current position, company, and experience are required for alumni' },
          { status: 400 }
        )
      }
    }

    // Create user object
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: body.name,
      email: body.email,
      password: body.password, // In production, hash this password
      phone: body.phone,
      department: body.department,
      bio: body.bio || '',
      role: role,
      createdAt: new Date().toISOString(),
      isActive: true,
      // Student specific fields
      ...(role === 'student' && {
        studentId: body.studentId,
        graduationYear: body.graduationYear,
        currentSemester: body.currentSemester,
        followers: 0,
        following: 0
      }),
      // Alumni specific fields
      ...(role === 'alumni' && {
        graduationYear: body.graduationYear,
        currentPosition: body.currentPosition,
        company: body.company,
        experience: body.experience,
        linkedinProfile: body.linkedinProfile || '',
        skills: body.skills || [],
        followers: 0,
        following: 0
      })
    }

    // Add user to store (in production, save to database)
    users.push(newUser)

    // Return success response (without password)
    const { password, ...userWithoutPassword } = newUser
    
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to check if email exists (for validation)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    const existingUser = users.find(user => user.email === email)
    
    return NextResponse.json({
      exists: !!existingUser
    })

  } catch (error) {
    console.error('Email check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
