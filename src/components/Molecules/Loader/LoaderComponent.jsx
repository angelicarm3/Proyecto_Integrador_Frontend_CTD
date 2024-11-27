import './loaderComponent.css'

import { AiOutlineLoading } from 'react-icons/ai'

const LoaderComponent = () => {
  return (
    <div className='modal-wrapper pop-up-bg loader-bg'>
      <AiOutlineLoading size={40} className='loader-icon' />
    </div>

  )
}

export default LoaderComponent
