import './loginRegisterGrid.css'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import VideoLoginRegister from '../../Organisms/VideoLoginRegister/VideoLoginRegister'
import LoginRegisterComponent from '../../Organisms/LoginRegisterComponent/LoginRegisterComponent'

const LoginRegisterGrid = () => {
  return (
    <div className='main-section flex flex-col justify-center items-center text-gray4 pb-8 px-4 gap-6'>
      <div className='self-end'>
        <BackBtn />
      </div>
      <div className='h-fit w-full lg:w-[900px] flex justify-center items-center gap-10'>
        <div className='h-full w-6/12 hidden md:flex '>
          <VideoLoginRegister />
        </div>
        <LoginRegisterComponent />
      </div>
    </div>
  )
}

export default LoginRegisterGrid
