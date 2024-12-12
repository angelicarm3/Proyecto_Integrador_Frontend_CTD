import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import santaHat from '../../../assets/page/santa-hat.png'

const WappBtn = () => {
  return (
    <div className='absolute'>
      <Link className='fixed bottom-20 right-6 flex items-center justify-center bg-yellow1 h-12 w-12 lg:h-16 lg:w-16 rounded-full  hover:opacity-75 z-10 mr-4 mb-4' to='https://wa.me/+573143899603' target='_blank' rel='noreferrer'>
        <FaWhatsapp className='w-[35px] h-[35px] lg:w-[50px] lg:h-[50px]' />
        <img src={santaHat} alt='' className='w-14 lg:w-20 h-fit fixed bottom-[95px] right-[18px] lg:bottom-[88px] lg:right-[8px]' />
      </Link>
    </div>
  )
}

export default WappBtn
