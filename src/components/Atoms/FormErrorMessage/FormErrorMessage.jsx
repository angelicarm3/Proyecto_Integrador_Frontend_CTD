import { FaExclamationCircle } from 'react-icons/fa'

const FormErrorMessage = ({ message, error }) => {
  return (
    <div className={`form-error-container ${error === 'images' ? 'left-[120px] top-[32px] absolute' : error === 'description' && 'left-0 bottom-[8px] absolute'}`}>
      <FaExclamationCircle size={12} className='form-error-icon' />
      <p className='form-error-text'>{message}</p>
    </div>
  )
}

export default FormErrorMessage
