import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { TbCheckbox } from 'react-icons/tb'

import { useSelector } from 'react-redux'
import './checkboxButton.css'

const CheckboxButton = ({ navigateTo }) => {
  const { isRememberMe } = useSelector((state) => state.form)

  return (
    <div className='w-4 bg-greyBrand500 z-30 cursor-pointer'>
      {
        isRememberMe
          ? <TbCheckbox size={24} />
          : <MdOutlineCheckBoxOutlineBlank size={24} />
      }
    </div>
  )
}

export default CheckboxButton
