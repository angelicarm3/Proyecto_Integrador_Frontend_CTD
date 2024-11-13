import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const RequireAdmin = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.loginRegister)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (!isAdmin) {
      const timer = setTimeout(() => setRedirect(true), 2000) // Espera 2 segundos
      return () => clearTimeout(timer) // Limpia el temporizador si el componente se desmonta
    }
  }, [isAdmin])

  if (redirect) {
    return <Navigate to='/' replace />
  }

  return children
}

export default RequireAdmin
