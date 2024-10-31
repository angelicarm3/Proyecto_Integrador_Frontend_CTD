import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import './backBtn.css'
import { pageData } from '../../../data/page'

const BackBtn = () => {
  const navigate = useNavigate()

  return (
    <button className='back-btn' onClick={() => navigate(-1)}>
      <AiOutlineArrowLeft size={20} />
      <p>{pageData.buttons.back}</p>
    </button>
  )
}

export default BackBtn
