import { pageData } from '../../../data/page'

const SignUpBtn = () => {
  return (
    <button className='secondary-btn log-in-btn'>
      {pageData.buttons.signUp}
    </button>
  )
}

export default SignUpBtn
