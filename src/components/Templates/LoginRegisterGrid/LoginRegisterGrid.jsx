import BackBtn from '../../Atoms/BackBtn/BackBtn'
import LoginRegisterComponent from '../../Organisms/LoginRegisterComponent/LoginRegisterComponent'
import VideoLoginRegister from '../../Organisms/VideoLoginRegister/VideoLoginRegister'

const LoginRegisterGrid = () => {
  return (
    <div className='main-section flex flex-col justify-center items-center text-gray4 pb-8 px-4 gap-6'>
      <div className='w-fit flex flex-col justify-center rounded-3xl bg-black1 px-3 h-10 font-Roboto font-bold hover:opacity-50 self-end'>
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
