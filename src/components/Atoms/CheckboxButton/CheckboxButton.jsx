import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { TbCheckbox } from 'react-icons/tb'

import { useSelector } from 'react-redux'

const CheckboxButton = () => {
  const { agreeTerms } = useSelector((state) => state.form)

  return (
    <div className='w-4 text-yellow1 z-30 cursor-pointer'>
      {
        agreeTerms
          ? <TbCheckbox size={24} />
          : <MdOutlineCheckBoxOutlineBlank size={24} />
      }
    </div>
  )
}

export default CheckboxButton
