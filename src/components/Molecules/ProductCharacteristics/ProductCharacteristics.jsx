import { useTranslation } from 'react-i18next'

import { useEffect, useState } from 'react'
import { translateText } from '../../../service/translateText'
import './productCharacteristics.css'

const ProductCharacteristics = ({ characteristics, type }) => {
  const { t, i18n } = useTranslation()

  const [translatedCharacteristics, setTranslatedCharacteristics] = useState([])

  useEffect(() => {
    const fetchTranslations = async () => {
      // Itera sobre cada característica y traduce su nombre
      const translations = await Promise.all(
        characteristics.map(async (characteristic) => {
          const translatedName = await translateText(characteristic.nombre)
          return { ...characteristic, nombreTraducido: translatedName }
        })
      )

      // Actualiza el estado con el array traducido
      setTranslatedCharacteristics(translations)
    }

    if (characteristics && characteristics.length > 0) {
      fetchTranslations()
    }
  }, [characteristics])
  console.log(translatedCharacteristics)

  return (
    <div className='product-characteristics-container'>
      {
        type !== 'share' &&
          <p className='product-characteristics-title'>{t('characteristics')}</p>
      }
      <div className='product-characteristics-grid'>
        {
        characteristics.map((characteristic, index) => (
          <div key={index} className='product-characteristics-card'>
            <div className='product-characteristics-icons'>
              <img src={characteristic.icono} alt='' />
            </div>
            {
              i18n.language === 'en' && translatedCharacteristics.length > 0
                ? <p>{translatedCharacteristics[index].nombreTraducido}</p>
                : <p>{characteristic.nombre}</p>
            }
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default ProductCharacteristics
