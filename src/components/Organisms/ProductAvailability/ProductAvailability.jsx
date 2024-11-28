import Calendar from 'react-calendar'

import './productAvailability.css'

const ProductAvailability = () => {
  const today = new Date() // Fecha actual
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())

  return (
    <div className='w-full flex flex-col items-center gap-8 mt-8'>
      <p className='product-detail-name w-full mb-0 text-xl text-white text-left'>Disponibilidad</p>
      <div className='w-full md:max-w-[750px] md:min-w-[750px] flex gap-10'>
        <Calendar
          locale='es-ES'
        />
        <Calendar
          locale='es-ES'
          activeStartDate={nextMonth}
        />
      </div>
    </div>
  )
}

export default ProductAvailability
