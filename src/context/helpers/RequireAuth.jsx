import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.loginRegister)

  if (!isLoggedIn) {
    return <Navigate to='/' replace />
  }

  return children
}

export default RequireAuth
