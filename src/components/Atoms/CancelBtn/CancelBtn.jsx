import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import './cancelBtn.css'

const CancelBtn = ({ handleClick }) => {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <button type='button' className={`${location.pathname.includes('/producto/') ? 'secondary-btn px-4 rounded-full text-white cursor-pointer' : 'cancel-btn'}`} onClick={() => handleClick()}>
      <p>{t('cancel')}</p>
    </button>
  )
}

export default CancelBtn
