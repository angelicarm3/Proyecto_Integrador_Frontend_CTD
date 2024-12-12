import { useTranslation } from 'react-i18next'

const RentNowBtn = ({ onRentClick }) => {
  const { t } = useTranslation()

  return (
    <button className='primary-btn rent-now-btn' onClick={() => onRentClick()}>
      {t('rentNow')}
    </button>
  )
}

export default RentNowBtn
