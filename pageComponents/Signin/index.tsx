import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import styles from './styles.module.scss'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const supabaseSignUp = async (email: string, password: string) => {
    const { error, user, session } = await supabase.auth.signUp({
      email,
      password,
    })
    error && setError(error.message)
    // console.log('user -->', user)
    // console.log('session -->', session)
  }

  const supabaseSignIn = async (email: string, password: string) => {
    const { error, user, session } = await supabase.auth.signIn({
      email,
      password,
    })
    error && setError(error.message)
    // console.log('user sigin -->', user)
    // console.log('session signin -->', session)
  }

  useEffect(() => {
    if(error === '') return
    const clearError = setTimeout(() => {
      setError('')
    }, 5000)

    return () => clearTimeout(clearError)
  }, [error])

  return (
    <form className={styles.form}>
      {error && <p>{error}</p>}

      <div className={styles.formControl}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <div className={styles.formControl}>
        <button
          onClick={(e) => {
            e.preventDefault()
            supabaseSignUp(email, password)
          }}
        >
          Cadastrar
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            supabaseSignIn(email, password)
          }}
        >
          Entrar
        </button>
      </div>
    </form>
  )
}
