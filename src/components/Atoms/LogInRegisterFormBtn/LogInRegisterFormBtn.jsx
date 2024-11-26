import { useSelector } from 'react-redux'
import { pageLabels } from '../../../data/pageLabels'

const LogInRegisterFormBtn = () => {
  const { loginOrRegister } = useSelector((state) => state.loginRegister)

  return (
    <button type='submit' className='primary-btn w-full h-[44px] text-[18px] text-black1 font-bold rounded-[36px] my-4'>
      {
          loginOrRegister === 'login'
            ? pageLabels.loginRegister.logInBtn
            : pageLabels.loginRegister.registerBtn
        }
    </button>
  )
}

export default LogInRegisterFormBtn
