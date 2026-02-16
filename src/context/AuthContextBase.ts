import { createContext } from 'react'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

export interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

