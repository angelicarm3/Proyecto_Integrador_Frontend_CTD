import { Tooltip as ReactTooltip } from 'react-tooltip'
import { BiSolidDetail } from 'react-icons/bi'

const DetailBtn = ({ onClickDetail }) => {
  return (
    <>
      <button
        className='bg-yellow1 px-4 py-2 rounded text-xl'
        onClick={() => onClickDetail()}
        data-tooltip-id='detail-tooltip'
      >
        <BiSolidDetail size={24} />
      </button>
      <ReactTooltip
        id='detail-tooltip'
        place='top'
        effect='float'
        content='Detalle'
      />
    </>
  )
}

export default DetailBtn
