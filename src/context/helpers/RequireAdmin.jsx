import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const RequireAdmin = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.loginRegister)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isAdmin) {
      const timer = setTimeout(() => {
        setChecking(false)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setChecking(false)
    }
  }, [isAdmin])

  if (checking) {
    return null
  }

  if (!isAdmin) {
    return <Navigate to='/' replace />
  }

  return children
}

export default RequireAdmin
