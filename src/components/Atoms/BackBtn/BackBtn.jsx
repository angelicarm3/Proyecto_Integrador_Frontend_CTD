import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import './backBtn.css'
import { pageLabels } from '../../../data/pageLabels'

const BackBtn = ({ navigateTo }) => {
  const navigate = useNavigate()

  return (
    <button className='back-btn' onClick={() => navigate(navigateTo || -1)}>
      <AiOutlineArrowLeft size={20} />
      <p>{pageLabels.buttons.back}</p>
    </button>
  )
}

export default BackBtn
