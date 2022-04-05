import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { Session, User } from '@supabase/supabase-js'

interface AuthProvider {
  user: User | null
  session: Session | null
}

const AuthContext = createContext<AuthProvider>({
  user: null,
  session: null,
})

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AuthProvider['user']>(null)
  const [session, setSession] = useState<AuthProvider['session']>(null)

  useEffect(() => {
    const existingSession = supabase.auth.session()
    setSession(existingSession)
    setUser(existingSession?.user ?? null)

    const { data: authListener, error } = supabase.auth.onAuthStateChange(
      async (event, session_) => {
        setSession(session_)
        setUser(session_?.user ?? null)
      }
    )

    error && console.log('onAuth error -->', error.message)

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  console.log('session -->', session)

  return (
    <AuthContext.Provider value={{ user: user, session: session }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
