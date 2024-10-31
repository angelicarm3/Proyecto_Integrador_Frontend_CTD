import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'

import './rentNowPopUp.css'
import RentNowForm from '../../Organisms/RentNowForm/RentNowForm'

const RentNowPopUp = () => {
  const navigate = useNavigate()

  return (
    <div className='pop-up-bg'>
      <AiOutlineClose className='close-btn' size={30} onClick={() => navigate(-1)} />
      <RentNowForm />
    </div>
  )
}

export default RentNowPopUp
