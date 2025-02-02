import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { changePage, filterData } from '../../../context/slices/paginatorSlice'
import { fetchAllUsersAdminThunk, resetStatus } from '../.././../context/slices/adminUserSlice'
import BackBtn from '../../Atoms/BackBtn/BackBtn'
import Dropdown from '../../Atoms/DropDown/DropDown'
import LoaderComponent from '../../Molecules/Loader/LoaderComponent'
import Paginator from '../../Molecules/Paginator/Paginator'
import UserRow from '../../Molecules/UserRow/UserRow'
import AdminTable from '../../Organisms/AdminTable/AdminTable'
import '../AdminProducts/AdminProducts.css'

const headers = ['id', 'labelName', 'labelEmail', 'role', 'actions']

const AdminUsers = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = localStorage.getItem('token')
  const { items } = useSelector((state) => state.paginator)
  const { users, totalUsers, loading } = useSelector((state) => state.adminUsers)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetStatus())
    if (token) {
      dispatch(fetchAllUsersAdminThunk(token))
    }
  }, [dispatch, token])

  useEffect(() => {
    dispatch(filterData(users))
  }, [dispatch, users])

  const onChangePage = (page) => {
    dispatch(changePage(page))
    dispatch(filterData(users))
  }

  return (
    <div className='admin-products-container'>
      <p className='title'>{t('usersList')}</p>
      <div>
        <section className='admin-products-section'>
          <BackBtn navigateTo='/administracion' />

          <div className='admin-products-dropDown-conatiner'>
            <span>{t('results')}</span>
            <Dropdown allItems={users} />
          </div>
        </section>

        <AdminTable headers={headers}>
          {
            items?.map((user) => (
              <UserRow key={user.id} user={user} />
            ))
          }
        </AdminTable>
      </div>

      <Paginator totalItems={totalUsers} onClick={onChangePage} />

      {
        loading &&
          <LoaderComponent />
      }
    </div>
  )
}

export default AdminUsers
