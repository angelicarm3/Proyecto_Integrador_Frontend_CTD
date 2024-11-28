import { useLocation } from 'react-router-dom'

import { pageLabels } from '../../../data/pageLabels'
import './saveBtn.css'

const SaveBtn = () => {
  const location = useLocation()

  return (
    <button className={`${location.pathname.includes('/producto/') ? 'primary-btn px-4 rounded-full text-black1' : 'save-btn'}`} type='submit'>
      <p>{pageLabels.buttons.save}</p>
    </button>
  )
}

export default SaveBtn
