import { pageLabels } from '../../../data/pageLabels'

const LogInBtn = () => {
  return (
    <button className='primary-btn log-in-btn'>
      {pageLabels.buttons.logIn}
    </button>
  )
}

export default LogInBtn
