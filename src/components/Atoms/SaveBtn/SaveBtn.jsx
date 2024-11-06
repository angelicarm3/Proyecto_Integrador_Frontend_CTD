import './saveBtn.css'
import { pageLabels } from '../../../data/pageLabels'

const SaveBtn = () => {
  return (
    <button className='save-btn' type='submit'>
      <p>{pageLabels.buttons.save}</p>
    </button>
  )
}

export default SaveBtn
