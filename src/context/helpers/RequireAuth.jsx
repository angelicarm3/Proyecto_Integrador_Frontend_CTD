import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useSelector(state => state.loginRegister)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecking(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (checking) {
    return null
  }

  if (!isLoggedIn) {
    return <Navigate to='/' replace />
  }

  return children
}

export default RequireAuth
