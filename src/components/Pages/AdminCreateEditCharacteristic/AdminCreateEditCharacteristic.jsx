import { useSelector } from 'react-redux'

import './adminCreateEditCharacteristic.css'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import CreateEditCharacteristicForm from '../../Organisms/CreateEditCharacteristicForm/CreateEditCharacteristicForm'

const AdminCreateEditCharacteristic = () => {
  const { loading } = useSelector((state) => state.form)

  return (
    <section className='main-section admin-create-product-container relative'>
      <CreateEditCharacteristicForm />
      {
        loading &&
          <LoaderComponent />
      }
    </section>
  )
}

export default AdminCreateEditCharacteristic
