import { Link, useLocation } from 'react-router-dom'

import { pageLabels } from '../../../data/pageLabels'

const RentNowBtn = () => {
  const location = useLocation()

  return (
    <Link to='/rentar' state={{ previousLocation: location }} className='primary-btn rent-now-btn'>
      {pageLabels.buttons.rentNow}
    </Link>
  )
}

export default RentNowBtn
