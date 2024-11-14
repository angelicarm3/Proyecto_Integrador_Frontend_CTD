import { useSelector } from 'react-redux'

import './adminCreateEditProduct.css'
import CreateEditProductForm from '../../Organisms/CreateEditProductForm/CreateEditProductForm'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'

const AdminCreateEditProduct = () => {
  const { loading } = useSelector((state) => state.form)

  return (
    <section className='main-section admin-create-product-container relative'>
      <CreateEditProductForm />
      {
          loading &&
            <LoaderComponent />
        }
    </section>
  )
}

export default AdminCreateEditProduct
