import { useSelector } from 'react-redux'

import './adminCreateEditCategory.css'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import CreateEditCategoryForm from '../../Organisms/CreateEditCategoryForm/CreateEditCategoryForm'

const AdminCreateEditCategory = () => {
  const { loading } = useSelector((state) => state.form)

  return (
    <section className='main-section admin-create-product-container relative'>
      <CreateEditCategoryForm />
      {
        loading &&
          <LoaderComponent />
      }
    </section>
  )
}

export default AdminCreateEditCategory
