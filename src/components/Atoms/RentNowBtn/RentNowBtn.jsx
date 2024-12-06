import { pageLabels } from '../../../data/pageLabels'

const RentNowBtn = ({ onRentClick }) => {
  return (
    <button className='primary-btn rent-now-btn' onClick={() => onRentClick()}>
      {pageLabels.buttons.rentNow}
    </button>
  )
}

export default RentNowBtn
