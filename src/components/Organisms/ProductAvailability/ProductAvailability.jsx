import Calendar from 'react-calendar'
import { useSelector } from 'react-redux'

import { useState } from 'react'
import './productAvailability.css'

const ProductAvailability = ({ product }) => {
  const { bookins } = useSelector((state) => state.bookins)
  const today = new Date()
  const [activeStartDate, setActiveStartDate] = useState(new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()))

  const disableAll = () => true

  const timeFrame = bookins.filter(
    bookin => bookin.auto.id === product.id).map(item => ({
    fechaInicio: item.fechaInicio,
    fechaFin: item.fechaFin
  }))

  const isInTimeFrame = (date) => {
    const dayDate = new Date(date)
    const dayDateLocal = new Date(dayDate.getUTCFullYear(), dayDate.getUTCMonth(), dayDate.getUTCDate())

    for (const frame of timeFrame) {
      const startDate = new Date(frame.fechaInicio)
      const startDateLocal = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate())
      const endDate = new Date(frame.fechaFin)
      const endDateLocal = new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate())
      endDateLocal.setHours(23, 59, 0, 0)

      if (dayDateLocal >= startDateLocal && dayDateLocal <= endDateLocal) {
        return true
      }
    }
    return false
  }

  const tileClassName = ({ date }) => {
    const dayDate = new Date(date)
    const today = new Date()
    today.setHours(0, 1, 0, 0)

    if (dayDate < today) {
      return 'text-gray3 line-through decoration-2 font-semibold'
    }

    return isInTimeFrame(date) ? 'text-red1 line-through decoration-2 font-semibold' : 'text-green1 font-semibold'
  }

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate)
  }

  return (
    <div className='w-full flex flex-col items-center gap-2 mt-8'>
      <p className='product-detail-name w-full md:max-w-[784px] md:min-w-[750px] mb-0 text-xl text-white text-center md:text-left'>Disponibilidad</p>
      <div className='w-full md:max-w-[840px] md:min-w-[784px] flex justify-center gap-10'>
        <Calendar
          locale='es-ES'
          view='month'
          tileDisabled={disableAll}
          tileClassName={tileClassName}
          showNeighboringMonth={false}
        />
        <Calendar
          locale='es-ES'
          view='month'
          activeStartDate={activeStartDate}
          onActiveStartDateChange={handleActiveStartDateChange}
          tileDisabled={disableAll}
          tileClassName={tileClassName}
          showNeighboringMonth={false}
          className='hidden md:flex'
        />
      </div>
    </div>
  )
}

export default ProductAvailability
