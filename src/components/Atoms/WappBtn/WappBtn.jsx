import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import santaHat from '../../../assets/page/santa-hat.png'

const WappBtn = () => {
  return (
    <div className='absolute'>
      <Link className='fixed bottom-20 right-6 flex items-center justify-center bg-yellow1 h-16 w-16 rounded-full  hover:opacity-75 z-10 mr-4 mb-4' to='https://wa.me/+573143899603' target='_blank' rel='noreferrer'>
        <FaWhatsapp size={50} />
        <img src={santaHat} alt='' className='w-20 h-fit fixed bottom-[88px] right-[8px]' />
      </Link>
    </div>
  )
}

export default WappBtn
