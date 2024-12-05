import { useSelector } from 'react-redux'

import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'

const RentNowDetails = ({ onClose }) => {
  const { bookinData } = useSelector((state) => state.form)
  const { selectedProduct } = useSelector((state) => state.product)
  const { loggedUser } = useSelector((state) => state.loginRegister)

  const handleConfirmClick = () => {
    console.log(bookinData)
  }
  console.log(bookinData)
  console.log(selectedProduct)
  console.log(loggedUser)

  return (
    <div className='w-full h-fit flex flex-col justify-center items-center'>
      <div>
        <p>d</p>
      </div>

      <div className='flex gap-6 mt-4'>
        <button className='primary-btn px-4 rounded-full text-black1' type='button' onClick={handleConfirmClick}>
          <p>Confirmar</p>
        </button>
        <CancelBtn handleClick={onClose} />
      </div>
    </div>
  )
}

export default RentNowDetails
