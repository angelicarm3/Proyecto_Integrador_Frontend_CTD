import { pageData } from '../../../data/page'

const RentNowBtn = () => {
  return (
    <button className='primary-btn rent-now-btn'>
      {pageData.buttons.rentNow}
    </button>
  )
}

export default RentNowBtn
