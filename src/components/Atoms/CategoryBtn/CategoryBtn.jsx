/* eslint-disable react/prop-types */
const CategoryBtn = ({ category }) => {
  const { img, text } = category

  return (
    <button className='w-fit h-fit flex flex-col justify-center pb-2 hover:opacity-75 hover:bg-gray3 rounded-2xl'>
      <img src={img} alt={text} className='w-[280px]' />
      <p className='w-full font-semibold text-xl text-white text-center'>{text}</p>
    </button>
  )
}

export default CategoryBtn
