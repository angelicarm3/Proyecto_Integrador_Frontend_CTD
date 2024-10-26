import { pageData } from '../../../data/page'

const LogInBtn = () => {
  return (
    <button className='primary-btn log-in-btn'>
      {pageData.buttons.logIn}
    </button>
  )
}

export default LogInBtn
