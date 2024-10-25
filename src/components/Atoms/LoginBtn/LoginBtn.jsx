import { pageData } from '../../../data/page'

const LogInBtn = () => {
  return (
    <button className='primaryBtn w-24 rounded-3xl'>
      {pageData.buttons.logIn}
    </button>
  )
}

export default LogInBtn
