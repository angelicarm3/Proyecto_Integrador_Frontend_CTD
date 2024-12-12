import { useTranslation } from 'react-i18next'
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const EditBtn = ({ navigateTo }) => {
  const { t } = useTranslation()

  return (
    <>
      <Link
        className=' bg-blue1 px-4 py-2 rounded text-lg cursor-pointer'
        to={navigateTo}
        data-tooltip-id='edit-tooltip'
      >
        <FaEdit size={24} />
      </Link>
      <ReactTooltip
        id='edit-tooltip'
        place='top'
        effect='float'
        content={t('edit')}
      />
    </>
  )
}

export default EditBtn
