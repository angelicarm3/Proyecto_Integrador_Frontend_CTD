import { HiTrash } from 'react-icons/hi'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const DeleteBtn = ({ onClickDelete }) => {
  return (
    <>
      <button
        className='bg-red1 px-4 py-2 rounded'
        onClick={() => onClickDelete()}
        data-tooltip-id='delete-tooltip'
      >
        <HiTrash size={24} />
      </button>
      <ReactTooltip
        id='delete-tooltip'
        place='top'
        effect='float'
        content='Eliminar'
      />
    </>
  )
}

export default DeleteBtn
