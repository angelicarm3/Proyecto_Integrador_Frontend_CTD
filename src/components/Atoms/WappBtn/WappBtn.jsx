import { useState } from 'react'

import { FaWhatsapp } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import santaHat from '../../../assets/page/santa-hat.png'

const WappBtn = () => {
  const { t } = useTranslation()
  const inputDefault = `${t('hiIWantMoreInfo')}`
  const [inputDisplayed, setInputDisplayed] = useState(false)
  const [inputValue, setInputValue] = useState(inputDefault)

  const handleToggleInput = () => {
    setInputDisplayed(!inputDisplayed)
  }

  const handleSend = () => {
    window.open(`https://wa.me/3143899603?text=${encodeURIComponent(inputValue)}`, '_blank')
    setInputDisplayed(false)
  }

  return (
    <div className='absolute'>
      <button onClick={handleToggleInput} className='fixed bottom-20 right-6 flex items-center justify-center bg-yellow1 h-12 w-12 lg:h-16 lg:w-16 rounded-full  hover:opacity-75 z-20 mr-4 mb-4'>
        <FaWhatsapp className='w-[35px] h-[35px] lg:w-[50px] lg:h-[50px]' />
        <img src={santaHat} alt='' className='w-14 lg:w-20 h-fit fixed bottom-[95px] right-[18px] lg:bottom-[88px] lg:right-[8px]' />
      </button>

      {
        inputDisplayed &&
        (
          <div className='wap-input-container fixed bottom-24 right-20 lg:flex-row gap-2 z-[10] justify-center bg-gray3 rounded-xl'>
            <div className='w-full flex flex-row gap-2 m-2'>
              <button className='h-full right-0 text-3xl p-0 hover:opacity-75' onClick={handleSend}> ✍️ </button>
              <input
                className='w-full input'
                id='searchTerm'
                type='text'
                defaultValue={inputDefault}
                onChange={(event) => setInputValue(event.target.value)}
              />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default WappBtn
