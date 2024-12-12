import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import santaHat from '../../../assets/page/santa-hat.png'
import { useState } from 'react'

// href="https://wa.me/+573143899603" target="_blank" rel='noreferrer'

const WappBtn = () => {
  const inputDefault = "Hola, quisiera mas info!"
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
      <button onClick={handleToggleInput} className='fixed bottom-20 right-6 flex items-center justify-center bg-yellow1 h-16 w-16 rounded-full  hover:opacity-85 z-[11] mr-4 mb-4'>
        <FaWhatsapp size={50} />
        <img src={santaHat} alt='' className='w-20 h-fit fixed bottom-[88px] right-[8px]' />
      </button>
      
      {
        inputDisplayed && 
        (
          <div className='wap-input-container fixed bottom-24 right-20 lg:flex-row gap-2 z-[10] justify-center bg-[#666666] rounded-xl'>
              <div className='w-full flex flex-row gap-2 m-2'>
              <button className='h-full right-0 text-3xl p-0 hover:opacity-75' onClick={handleSend} > ✍️ </button>
                <input
                  className='w-full input'
                  id='searchTerm'
                  type='text'
                  defaultValue= {inputDefault}
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
