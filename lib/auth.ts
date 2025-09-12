// Authentication helper functions

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  college: string
  lastLogin: string
}

export const getAdminUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const userData = localStorage.getItem('adminUser')
    if (!userData) return null
    
    const parsedUser = JSON.parse(userData)
    console.log('Auth: Retrieved user data:', parsedUser)
    return parsedUser
  } catch (error) {
    console.error('Auth: Error parsing user data:', error)
    localStorage.removeItem('adminUser')
    return null
  }
}

export const setAdminUser = (user: AdminUser): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('adminUser', JSON.stringify(user))
    console.log('Auth: User data stored:', user)
  } catch (error) {
    console.error('Auth: Error storing user data:', error)
  }
}

export const clearAdminUser = (): void => {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('adminUser')
  console.log('Auth: User data cleared')
}

export const isAdminAuthenticated = (): boolean => {
  return getAdminUser() !== null
}

export const isDeveloperAuthenticated = (): boolean => {
  const user = getAdminUser()
  return user !== null && user.role === 'developer'
}

export const isAdminOrDeveloperAuthenticated = (): boolean => {
  const user = getAdminUser()
  return user !== null && (user.role === 'admin' || user.role === 'developer')
}
