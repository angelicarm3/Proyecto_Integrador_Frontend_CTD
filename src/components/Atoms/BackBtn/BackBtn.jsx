import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import './backBtn.css'
import { pageLabels } from '../../../data/pageLabels'

const BackBtn = ({ navigateTo }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <button className={`back-btn ${location?.pathname.includes('/producto/') ? 'bg-transparent' : 'bg-black1 h-full'}`} onClick={() => navigate(navigateTo || -1)}>
      <AiOutlineArrowLeft size={20} />
      <p>{pageLabels.buttons.back}</p>
    </button>
  )
}

export default BackBtn
