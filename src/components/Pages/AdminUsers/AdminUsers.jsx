import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsersAdminThunk, deleteUserThunk, setItemsToShow, resetStatus, setPage } from '../../../context/slices/adminUserSlice';

import AdminSearchBar from '../../Organisms/AdminSearchBar/AdminSearchBar';
import SearchBtn from '../../Atoms/SearchBtn/SearchBtn';
import AdminUsersList from '../../Organisms/AdminUsersList/AdminUsersList';
import Dropdown from '../../Atoms/DropDown/DropDown';
import Pagination from '../../Molecules/Pagination/Pagination';
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn';
import { AiOutlineLoading } from 'react-icons/ai';
import { pageLabels } from '../../../data/pageLabels';
import AddBtnUsers from '../../Atoms/AddBtnUsers/AddBtnUsers'; // Importar el botón para añadir usuario
import './AdminUsers.css';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const options = [10, 20, 30, 40, 50];
  const headers = ['ID', 'Nombre', 'Email', 'Rol', 'Acciones'];

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { selectedUser, loading, error, success } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllUsersAdminThunk());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch(resetStatus());
      }, 3000);
    }
  }, [success, dispatch]);

  const usersList = useSelector((state) => state.adminUsers.allUsers) || [];
  const itemsToShow = useSelector((state) => state.adminUsers.itemsToShow);
  const currentPage = useSelector((state) => state.adminUsers.currentPage);

  const handleSelect = (count) => {
    dispatch(setItemsToShow(count));
  };

  const handleClick = () => {
    setShowConfirmDelete(false);
  };

  const handleDeleteClick = (userId) => {
    dispatch(deleteUserThunk(userId));
    setShowConfirmDelete(false);
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const totalItems = usersList.length;
  const startIndex = (currentPage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;
  const currentUsers = usersList.slice(startIndex, endIndex);

  return (
    <div className='admin-users-container'>
      <section className='admin-users-section'>
        <AddBtnUsers navigateTo='/administracion/agregar-usuario' /> {/* Botón de añadir usuario */}

        <div className='admin-search-bar-container'>
          <AdminSearchBar usersList={usersList} />
          <SearchBtn />
        </div>

        <div className='admin-users-dropDown-container'>
          <span>Resultados</span>
          <Dropdown options={options} onSelect={handleSelect} />
        </div>
      </section>

      <AdminUsersList users={currentUsers} setShowConfirmDelete={setShowConfirmDelete} headers={headers} />
      <div className='admin-users-pagination-container'>
        <Pagination totalItems={totalItems} itemsToShow={itemsToShow} handlePageChange={handlePageChange} currentPage={currentPage} />
        <p className='admin-users-p'>{`Resultados ${startIndex + 1} a ${endIndex} de ${totalItems}`}</p>
      </div>
      {showConfirmDelete && (
        <div className='admin-users-confirm-deletion-container pop-up-bg'>
          <div className='admin-users-confirm-deletion-modal'>
            <p className='admin-users-confirm-deletion-modal-p'>{pageLabels.adminUsers.confirmDeletion}</p>
            <div className='btn-container'>
              <button
                className='admin-users-confirm-deletion-modal-btn'
                type='button'
                onClick={() => handleDeleteClick(selectedUser.id)}
              >
                <p>{pageLabels.adminUsers.delete}</p>
              </button>
              <CancelBtn handleClick={handleClick} />
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className='admin-users-loading pop-up-bg'>
          <AiOutlineLoading size={40} className='loader-icon' />
        </div>
      )}
      {success && (
        <div className='admin-users-success pop-up-bg'>
          <div className='w-8/12 h-40 flex justify-center items-center bg-white border-2 border-gray1 rounded-lg'>
            <p className='text-xl text-green1'>¡Usuario eliminado con éxito!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
