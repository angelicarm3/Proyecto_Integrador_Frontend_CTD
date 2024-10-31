import './saveBtn.css'
import { pageData } from '../../../data/page'

const SaveBtn = () => {
  return (
    <button className='save-btn' type='submit'>
      <p>{pageData.buttons.save}</p>
    </button>
  )
}

export default SaveBtn
