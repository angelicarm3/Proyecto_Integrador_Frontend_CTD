import { useNavigate } from 'react-router-dom'

import './cancelBtn.css'
import { pageData } from '../../../data/page'

const CancelBtn = () => {
  const navigate = useNavigate()

  return (
    <button className='cancel-btn' onClick={() => navigate(-1)}>
      <p>{pageData.buttons.cancel}</p>
    </button>
  )
}

export default CancelBtn
