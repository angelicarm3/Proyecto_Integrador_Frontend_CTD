import { useLocation } from 'react-router-dom'

import { pageLabels } from '../../../data/pageLabels'
import './cancelBtn.css'

const CancelBtn = ({ handleClick }) => {
  const location = useLocation()

  return (
    <button type='button' className={`${location.pathname.includes('/producto/') ? 'secondary-btn px-4 rounded-full text-white cursor-pointer' : 'cancel-btn'}`} onClick={() => handleClick()}>
      <p>{pageLabels.buttons.cancel}</p>
    </button>
  )
}

export default CancelBtn
