import { Link } from 'react-router-dom'

import { pageLabels } from '../../../data/pageLabels'

const SignUpBtn = () => {
  return (
    <Link to='/registro' className='secondary-btn log-in-btn'>
      {pageLabels.buttons.signUp}
    </Link>
  )
}

export default SignUpBtn
