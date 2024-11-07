import { useNavigate } from 'react-router-dom';
import { pageLabels } from '../../../data/pageLabels';


const AddBtnUsers = ({ navigateTo }) => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    console.log('Agregar usuario');
    navigate(navigateTo); // Redirige a la página de agregar usuario
  };

  return (
    <button onClick={handleAddUser} className="primary-btn addBtnUsers">
      {pageLabels.addBtn.label} {/* Aquí puedes personalizar el texto que aparece */}
    </button>
  );
};

export default AddBtnUsers
