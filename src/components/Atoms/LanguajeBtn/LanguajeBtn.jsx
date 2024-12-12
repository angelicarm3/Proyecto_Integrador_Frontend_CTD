import { useTranslation } from 'react-i18next'

import enIcon from '../../../assets/page/en-icon.png'
import esIcon from '../../../assets/page/es-icon.png'

const LanguajeBtn = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className='h-full flex items-center gap-2'>
      {
        i18n.language === 'en'
          ? <button className='w-[30px] h-[30px] p-[3px] rounded-full hover:opacity-75 bg-gray3' onClick={() => changeLanguage('es')}>
            <img src={enIcon} alt='' className='w-full h-full' />
          </button>
          : <button className='w-[30px] h-[30px] p-[3px] rounded-full hover:opacity-75 bg-gray3' onClick={() => changeLanguage('en')}>
            <img src={esIcon} alt='' className='w-full h-full' />
          </button>
      }
    </div>
  )
}

export default LanguajeBtn
