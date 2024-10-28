import { Link, useLocation } from 'react-router-dom'

import { pageData } from '../../../data/page'

const RentNowBtn = () => {
  const location = useLocation()

  return (
    <Link to='/rentar' state={{ previousLocation: location }} className='primary-btn rent-now-btn'>
      {pageData.buttons.rentNow}
    </Link>
  )
}

export default RentNowBtn
