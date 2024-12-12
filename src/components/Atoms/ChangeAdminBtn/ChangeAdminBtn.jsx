import { FaUserShield } from 'react-icons/fa'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'

const ChangeAdminBtn = ({ user, onClickChangeAdmin }) => {
  const { t } = useTranslation()

  return (
    <>
      <button
        className={`${user.esAdmin ? 'bg-green1' : 'bg-blue1'} 'text-black px-4 py-2 rounded text-xl cursor-pointer'`}
        onClick={() => onClickChangeAdmin()}
        data-tooltip-id='admin-tooltip'
      >
        <FaUserShield size={24} />
      </button>
      <ReactTooltip
        id='admin-tooltip'
        place='top'
        effect='float'
        content={t('modifyAdmin')}
      />
    </>
  )
}

export default ChangeAdminBtn
