import './cancelBtn.css'
import { pageLabels } from '../../../data/pageLabels'

const CancelBtn = ({ handleClick }) => {
  return (
    <button type='button' className='cancel-btn' onClick={() => handleClick()}>
      <p>{pageLabels.buttons.cancel}</p>
    </button>
  )
}

export default CancelBtn
