import { useTranslation } from 'react-i18next'

const AdminTable = ({ headers, children }) => {
  const { t } = useTranslation()

  return (
    <table className='w-full border border-gray-300 '>
      <thead>
        <tr>
          {
            headers.map((header, index) => (
              <th key={index} className='border px-4 py-2 bg-customLighterBlue text-white font-normal'>
                {t(header)}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export default AdminTable
