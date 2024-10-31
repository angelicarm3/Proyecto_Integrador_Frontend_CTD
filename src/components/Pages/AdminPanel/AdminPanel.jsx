import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="p-4 mt-[68px]">
      <div className="block sm:hidden text-center text-red-500">
        <h2 className="text-xl font-semibold">No está disponible en dispositivos móviles.</h2>
      </div>

      <div className="hidden sm:block">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <Link
          to="/administracion/productos"
          className="mt-4 inline-block bg-yellow1 text-white px-4 py-2 rounded"
        >
          Lista de productos
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
