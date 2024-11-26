import { useSelector } from 'react-redux'

import isoTipoGold from '../../../assets/brand/isoTipoGold.svg'
import LoginRegisterSwitch from '../../Molecules/LoginRegisterSwitch/LoginRegisterSwitch'
import LoginForm from '../LoginForm/LoginForm'
import SignupForm from '../SignupForm/SignupForm'

// eslint-disable-next-line react/prop-types
const LoginRegisterComponent = () => {
  const { loginOrRegister } = useSelector((state) => state.loginRegister)

  return (
    <section className='w-full md:w-6/12 h-[660px] flex flex-col items-center bg-black3 rounded-lg px-3 md:px-10 py-4 gap-4'>
      <img src={isoTipoGold} alt='isotipo' className='w-[100px]' />
      <LoginRegisterSwitch />
      {
        loginOrRegister === 'login'
          ? <LoginForm />
          : <SignupForm />
      }
    </section>
  )
}

export default LoginRegisterComponent
