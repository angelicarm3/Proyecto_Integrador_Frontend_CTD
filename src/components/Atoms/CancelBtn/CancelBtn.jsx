import { useNavigate } from 'react-router-dom'

import './cancelBtn.css'
import { pageData } from '../../../data/page'

const CancelBtn = ({ handleClick }) => {
  const navigate = useNavigate()

  return (
    <button className='cancel-btn' onClick={() => handleClick()}>
      <p>{pageData.buttons.cancel}</p>
    </button>
  )
}

export default CancelBtn
