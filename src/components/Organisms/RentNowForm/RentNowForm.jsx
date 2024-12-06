import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Datepicker from 'react-tailwindcss-datepicker'

import { resetDatePicker, setSelectedDates, updateField, updateHasSubmited, updateSelectedDropoff, updateSelectedPickup, updateTotalDays, updateTotalPrice, clearError } from '../../../context/slices/formSlice'
import { pageLabels } from '../../../data/pageLabels'
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn'
import FormErrorMessage from '../../Atoms/FormErrorMessage/FormErrorMessage'
import ButtonField from '../../Molecules/ButtonField/ButtonField'
import './rentNowForm.css'

const RentNowForm = ({ onClose, formNumber, setFormNumber }) => {
  const dispatch = useDispatch()
  const [unavailableDates, setUnavailableDates] = useState([])
  const [todayDateLocal, setTodayDateLocal] = useState(null)
  const [errorOverlap, setErrorOverlap] = useState(false)
  const maxCommentCharacters = 200
  const { bookinsByProduct } = useSelector((state) => state.bookins)
  const { selectedProduct } = useSelector((state) => state.product)
  const { loggedUser } = useSelector((state) => state.loginRegister)
  const { bookinData, selectedDates, hasSubmited, selectedPickup, selectedDropoff, totalDays, totalPrice, error, success } = useSelector((state) => state.form)
  const { trigger } = useForm({ mode: 'onBlur', defaultValues: bookinData })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    dispatch(updateField({ field: id, value, form: 'bookin' }))
  }

  useEffect(() => {
    const todayDate = new Date()
    const todayDateLocal = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate())
    todayDateLocal.setHours(23, 59, 0, 0)
    setTodayDateLocal(todayDateLocal)
    dispatch(updateField({ field: 'autoId', value: selectedProduct.id, form: 'bookin' }))
    dispatch(updateField({ field: 'usuarioId', value: loggedUser.id, form: 'bookin' }))
  }, [selectedProduct, loggedUser])

  const getUnavailableDates = () => {
    const earliestDate = new Date(0)
    const earliestDateLocal = new Date(earliestDate.getUTCFullYear(), earliestDate.getUTCMonth(), earliestDate.getUTCDate())
    const unavailableDates = []
    unavailableDates.push({ startDate: earliestDateLocal, endDate: todayDateLocal })

    for (const frame of bookinsByProduct) {
      const bookinStartDate = new Date(frame.fechaInicio)
      const bookinStartDateLocal = new Date(bookinStartDate.getUTCFullYear(), bookinStartDate.getUTCMonth(), bookinStartDate.getUTCDate())
      const bookinEndDate = new Date(frame.fechaFin)
      const bookinEndDateLocal = new Date(bookinEndDate.getUTCFullYear(), bookinEndDate.getUTCMonth(), bookinEndDate.getUTCDate())
      bookinEndDateLocal.setHours(23, 59, 0, 0)

      unavailableDates.push({ startDate: bookinStartDateLocal, endDate: bookinEndDateLocal })
    }

    return unavailableDates
  }

  useEffect(() => {
    if (bookinsByProduct && todayDateLocal) {
      setUnavailableDates(getUnavailableDates())
    }
  }, [bookinsByProduct, todayDateLocal])

  const formatDateToYYYYMMDD = (date) => {
    const year = date?.getFullYear()
    const month = String(date?.getMonth() + 1).padStart(2, '0')
    const day = String(date?.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleDateChange = (dates) => {
    dispatch(clearError())
    const stringDates = {
      startDate: dates?.startDate ? formatDateToYYYYMMDD(dates.startDate) : null,
      endDate: dates?.endDate ? formatDateToYYYYMMDD(dates.endDate) : null
    }

    if (!stringDates.startDate && !stringDates.endDate) {
      dispatch(updateTotalDays(0))
      dispatch(updateTotalPrice(0))
      dispatch(resetDatePicker())
      dispatch(updateField({ field: 'precioFinal', value: 0, form: 'bookin' }))
    } else {
      const selectStartLocal = new Date(dates.startDate.getFullYear(), dates.startDate.getMonth(), dates.startDate.getDate())
      const selectEndLocal = new Date(dates.endDate.getFullYear(), dates.endDate.getMonth(), dates.endDate.getDate())
      selectEndLocal.setHours(23, 59, 0, 0)

      const differenceInTime = selectEndLocal - selectStartLocal
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))
      const finalPrice = selectedProduct.precioDia * differenceInDays

      dispatch(updateTotalDays(differenceInDays))
      dispatch(updateTotalPrice(finalPrice))
      dispatch(setSelectedDates(stringDates))
      dispatch(updateField({ field: 'precioFinal', value: finalPrice, form: 'bookin' }))
    }
  }

  const isOverlap = () => {
    const filteredUnavailableDates = unavailableDates.filter((range, index) => {
      return index !== 0 && range.endDate > todayDateLocal
    })

    const selectedStart = new Date(selectedDates.startDate)
    const selectStartLocal = new Date(selectedStart.getUTCFullYear(), selectedStart.getUTCMonth(), selectedStart.getUTCDate())
    const selectedEnd = new Date(selectedDates.endDate)
    const selectEndLocal = new Date(selectedEnd.getUTCFullYear(), selectedEnd.getUTCMonth(), selectedEnd.getUTCDate())
    selectEndLocal.setHours(23, 59, 0, 0)

    return filteredUnavailableDates.some((range) => {
      // Verifica si hay solapamiento entre los rangos
      return (
        (selectStartLocal > range.startDate && selectStartLocal < range.endDate) || // Inicio del seleccionado dentro del rango no disponible
        (selectEndLocal >= range.startDate && selectEndLocal <= range.endDate) || // Fin del seleccionado dentro del rango no disponible
        (selectStartLocal <= range.startDate && selectEndLocal >= range.endDate) // Seleccionado abarca todo el rango no disponible
      )
    })
  }

  useEffect(() => {
    if (selectedDates && unavailableDates) {
      setErrorOverlap(isOverlap())
    }
  }, [selectedDates, unavailableDates])

  const handleNextStep = async () => {
    dispatch(updateHasSubmited())
    dispatch(updateField({ field: 'lugarRecogida', value: selectedPickup[0].nombre, form: 'bookin' }))
    dispatch(updateField({ field: 'lugarEntrega', value: selectedDropoff[0].nombre, form: 'bookin' }))
    const allFields = Object.keys(bookinData) // bookinData contiene los campos del formulario.

    // Valida todos los campos registrados
    const isValid = await trigger(allFields)

    // Si la validación es exitosa, avanza al siguiente paso
    if (isValid && selectedPickup.length > 0 && selectedDropoff.length > 0 && !errorOverlap && !error && (selectedDates.startDate || selectedDates.endDate)) {
      setFormNumber(formNumber + 1) // Cambia al siguiente paso
    }
  }

  useEffect(() => {
    if (error) {
      setFormNumber(1)
    } else if (success) {
      onClose()
    }
  }, [error, success])

  return (
    <form className='w-full h-fit flex flex-col justify-center items-center'>
      <div className='w-full h-fit flex flex-col rounded-xl font-bold relative p-2 gap-2'>
        <label htmlFor='dates' className='label w-full text-gray6 font-Urbanist text-left'>{pageLabels.createBookin.dates}</label>
        <div className='datepicker-container w-full hidden md:flex gap-2'>
          <Datepicker
            i18n='en'
            startWeekOn='mon'
            popoverDirection='down'
            containerClassName='w-full relative font-Urbanist'
            inputClassName={`input w-full text-black1 ${errorOverlap && 'border-red1'}`}
            primaryColor='yellow'
            displayFormat='DD/MM/YYYY'
            separator='-'
            theme='light'
            placeholder={pageLabels.createBookin.dates}
            value={selectedDates}
            onChange={newValue => handleDateChange(newValue)}
            disabledDates={unavailableDates}
          />
        </div>
        <div className='datepicker-container w-full flex md:hidden gap-2'>
          <Datepicker
            i18n='en'
            useRange={false}
            startWeekOn='mon'
            popoverDirection='down'
            containerClassName='w-full relative font-Urbanist'
            inputClassName={`input w-full text-black1 ${errorOverlap || (hasSubmited && (!selectedDates.startDate || !selectedDates.endDate)) ? 'border-red1' : ''}`}
            primaryColor='yellow'
            displayFormat='DD/MM/YYYY'
            separator='-'
            theme='light'
            placeholder={pageLabels.createBookin.dates}
            value={selectedDates}
            onChange={newValue => handleDateChange(newValue)}
            disabledDates={unavailableDates}
          />
        </div>
        <div className='w-full flex gap-6 text-yellow1 text-sm font-Urbanist'>
          <p>Número días: <span>{totalDays}</span></p>
          <p>Precio total: $<span>{totalPrice}</span></p>
        </div>
        {
        (errorOverlap || (error && error.includes('no está disponible'))) && <FormErrorMessage message='Esta selección incluye fechas no disponibles' />
        }
        {
          hasSubmited && (!selectedDates.startDate || !selectedDates.endDate) &&
            <FormErrorMessage message={pageLabels.createProduct.requiredError} />
        }
      </div>

      <ButtonField
        items={pageLabels.createBookin.cities}
        containerClass='field-container w-full p-2'
        label={pageLabels.createBookin.pickUp}
        labelClass='label w-full text-gray6 font-Urbanist text-left'
        selectedItems={selectedPickup}
        onChange={(item) => dispatch(updateSelectedPickup([item]))}
        errorMessage={pageLabels.createProduct.requiredError}
      />

      <ButtonField
        items={pageLabels.createBookin.cities}
        containerClass='field-container w-full p-2'
        label={pageLabels.createBookin.dropOff}
        labelClass='label w-full text-gray6 font-Urbanist text-left'
        selectedItems={selectedDropoff}
        onChange={(item) => dispatch(updateSelectedDropoff([item]))}
        errorMessage={pageLabels.createProduct.requiredError}
      />

      <div className='field-container w-full p-2'>
        <label htmlFor='comentario' className='label w-full text-gray6 font-Urbanist text-left'>
          {pageLabels.createBookin.comment}
        </label>
        <textarea
          id='comentario'
          maxLength={maxCommentCharacters}
          value={bookinData.comentario}
          className='input text-black1 description-input'
          placeholder='Comentario'
          onChange={(e) => {
            handleInputChange(e)
            e.target.dispatchEvent(new Event('input', { bubbles: true }))
          }}
        />
        <div className='input-counter text-gray6'>
          {maxCommentCharacters - (bookinData.comentario?.length || 0)} {pageLabels.createProduct.characterCount}
        </div>
      </div>

      <div className='flex gap-6 mt-4'>
        <button type='button' className='primary-btn px-4 rounded-full text-black1' onClick={() => handleNextStep()}>Continuar</button>
        <CancelBtn handleClick={onClose} />
      </div>
    </form>
  )
}

export default RentNowForm
