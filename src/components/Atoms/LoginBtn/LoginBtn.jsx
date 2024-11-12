import { Link } from 'react-router-dom'

import { pageLabels } from '../../../data/pageLabels'

const LogInBtn = () => {
  return (
    <Link to='/inicio-sesion' className='primary-btn log-in-btn'>
      {pageLabels.buttons.logIn}
    </Link>
  )
}

export default LogInBtn
