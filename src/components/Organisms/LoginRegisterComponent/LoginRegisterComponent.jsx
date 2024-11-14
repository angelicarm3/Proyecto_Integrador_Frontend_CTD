import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import isoTipoGold from '../../../assets/brand/isoTipoGold.svg'
import LoginRegisterSwitch from '../../Molecules/LoginRegisterSwitch/LoginRegisterSwitch'
import LoginForm from '../LoginForm/LoginForm'

// eslint-disable-next-line react/prop-types
const LoginRegisterComponent = () => {
  const navigate = useNavigate()
  const { loginOrRegister } = useSelector((state) => state.loginRegister)

  return (
    <section className='w-full md:w-6/12 h-[632px] flex flex-col items-center bg-black3 rounded-lg px-3 md:px-10 py-6 gap-6'>
      <img src={isoTipoGold} alt='isotipo' className='w-[130px]' />
      <LoginRegisterSwitch />
      {
          loginOrRegister === 'login'
            ? <LoginForm />
            : <LoginForm />
            // : <SignupForm />
        }
    </section>
  )
}

export default LoginRegisterComponent
