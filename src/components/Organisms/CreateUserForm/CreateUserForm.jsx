import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { assignAdminRole, removeAdminRole, fetchAllUsersAdminThunk } from '../../../context/slices/adminUserSlice';
import { useNavigate } from 'react-router-dom';


const CreateUserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isAdmin, setIsAdmin] = useState(false);
  const { users, loading, error } = useSelector((state) => state.adminUsers);

  // Fetch all users when the component mounts
  useEffect(() => {
    dispatch(fetchAllUsersAdminThunk());
  }, [dispatch]);

  // Handle form submission
  const onSubmit = (data) => {
    if (isAdmin) {
      dispatch(assignAdminRole(data.userId)); // Asignar rol de admin
    } else {
      dispatch(removeAdminRole(data.userId)); // Quitar rol de admin
    }
    navigate('/administracion/usuarios'); // Redirigir a la lista de usuarios
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-user-form-container">
      <h2 className="form-title">Asignar Rol de Administrador</h2>

      <div className="field-container">
        <label htmlFor="userId" className="label">Usuario</label>
        <select id="userId" {...register("userId", { required: true })} className="input">
          <option value="">Seleccione un usuario</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        {errors.userId && <span className="error-message">Seleccione un usuario</span>}
      </div>

      <div className="field-container">
        <label htmlFor="isAdmin" className="label">Permiso de Administrador</label>
        <input
          type="checkbox"
          id="isAdmin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
      </div>

      <button type="submit" className="primary-btn">Guardar</button>

      {loading && <p className="loading">Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default CreateUserForm;
