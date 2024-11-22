import { Tooltip as ReactTooltip } from 'react-tooltip'
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'

const EditBtn = ({ navigateTo }) => {
  return (
    <>
      <Link
        className=' bg-blue1 px-4 py-2 rounded text-lg'
        to={navigateTo}
        data-tooltip-id='edit-tooltip'
      >
        <FaEdit size={24} />
      </Link>
      <ReactTooltip
        id='edit-tooltip'
        place='top'
        effect='float'
        content='Editar'
      />
    </>
  )
}

export default EditBtn
