import { useTranslation } from 'react-i18next'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import isoWhite from '../../../assets/brand/isoWhite.png'
import './footer.css'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className='footer'>
      <div className='footer-container'>

        <div className='footer-logo-container'>
          <Link to='/'>
            <img src={isoWhite} alt='Logo de la marca' className='footer-logo' />
          </Link>
        </div>

        <div className='footer-policies'>
          <Link to='/politicas-uso' className='footer-policy-button'>{t('usePolicies')}
          </Link>
          <div className='footer-copyright'>
            <p>&copy; {new Date().getFullYear()}{t('allRightsReserved')}</p>
          </div>
        </div>

        <div className='footer-social'>
          <Link to='https://facebook.com/' aria-label='Facebook' target='_blank' rel='noopener noreferrer' className='social-icon'>
            <FaFacebook />
          </Link>
          <Link to='https://instagram.com/' aria-label='Instagram' target='_blank' rel='noopener noreferrer' className='social-icon'>
            <FaInstagram />
          </Link>
          <Link to='https://linkedin.com/' aria-label='LinkedIn' target='_blank' rel='noopener noreferrer' className='social-icon'>
            <FaLinkedin />
          </Link>
        </div>

      </div>
    </footer>
  )
}

export default Footer
