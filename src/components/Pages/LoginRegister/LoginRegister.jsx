import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

const LoginRegister = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
    }

    fetchData()
  }, [dispatch])

  return (
    <div className='main-page'>
      Login
    </div>
  )
}

export default LoginRegister
