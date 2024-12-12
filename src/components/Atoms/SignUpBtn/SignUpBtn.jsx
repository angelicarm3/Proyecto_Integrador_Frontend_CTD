import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SignUpBtn = () => {
  const { t } = useTranslation()

  return (
    <Link to='/registro' className='secondary-btn log-in-btn'>
      {t('signUp')}
    </Link>
  )
}

export default SignUpBtn
