import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const RequireAdmin = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.loginRegister)

  if (!isAdmin) {
    return <Navigate to='/' replace />
  }

  return children
}

export default RequireAdmin
