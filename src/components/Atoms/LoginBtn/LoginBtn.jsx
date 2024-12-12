import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

const LogInBtn = () => {
  const { t } = useTranslation()

  return (
    <Link to='/inicio-sesion' className='primary-btn log-in-btn text-black1'>
      {t('logIn')}
    </Link>
  )
}

export default LogInBtn
