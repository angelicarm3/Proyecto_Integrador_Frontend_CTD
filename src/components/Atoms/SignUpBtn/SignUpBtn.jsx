import { pageData } from '../../../data/page'

const SignUpBtn = () => {
  return (
    <button className='secondaryBtn w-24 rounded-3xl'>
      {pageData.buttons.signUp}
    </button>
  )
}

export default SignUpBtn
