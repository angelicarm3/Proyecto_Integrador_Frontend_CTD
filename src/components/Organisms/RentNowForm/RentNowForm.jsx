import { useSelector } from 'react-redux'

import './rentNowForm.css'
import { useForm } from 'react-hook-form'

const RentNowForm = () => {
  const selectedProduct = useSelector((state) => state.product.selectedProduct)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
  }

  return (
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      {/* <div className='flex flex-col pb-[10px] gap-2 mb-2'>
        <label htmlFor='email' className='label'>
          {}
        </label>
        <input
          id='email'
          type='text '
          className={`input ${errors.email && 'border-redBrand500'}`}
          placeholder={}
          value={email}
          {...register('email', {
            required: {
              value: true,
              message: `${loginRegister.invalidEmailError}`
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: `${loginRegister.invalidEmailError}`
            },
            onChange: (e) => setEmail(e.target.value)
          })}
        />
        {
          errors.email &&
            <div className='flex items-center gap-[3px]'>
              <img src={errorIcon} alt='' />
              <p className='font-Urbanist text-[12px] text-formLabel'>{errors.email.message}</p>
            </div>
        }
      </div> */}
      Product dropdown
      Start Date
      End Date
      Final price
      Pick up place
      Drop place
      Comment
    </form>
  )
}

export default RentNowForm
