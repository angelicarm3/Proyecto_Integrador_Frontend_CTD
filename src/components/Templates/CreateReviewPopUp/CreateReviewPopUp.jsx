import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import ReviewForm from '../../Organisms/ReviewForm/ReviewForm'

function CreateReviewPopUp ({ onClose, onSuccess }) {
  const { loading } = useSelector((state) => state.form)

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-popUpBg1 z-50'>
      <div
        className='w-11/12 md:w-[400px] bg-gray2 rounded-lg pt-12 md:pt-6 p-6 relative mx-auto overflow-auto border border-gray1'
      >
        <AiOutlineClose
          onClick={onClose}
          className='clickable shareProduct-close-btn'
        />
        <ReviewForm onClose={onClose} onSuccess={onSuccess} />
      </div>

      {
        loading &&
          <LoaderComponent />
      }
    </div>
  )
}

export default CreateReviewPopUp
