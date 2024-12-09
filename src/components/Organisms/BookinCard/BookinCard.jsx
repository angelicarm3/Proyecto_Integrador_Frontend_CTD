import React from 'react'

const BookinCard = ({ booking }) => {
  const { auto, fechaInicio, fechaFin, estado } = booking

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={auto.imagenes[0]?.url || '/default-image.jpg'}
        alt={`${auto.marca} ${auto.modelo}`}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">{auto.marca} {auto.modelo}</h2>
        <p><strong>Fecha de inicio:</strong> {new Date(fechaInicio).toLocaleDateString()}</p>
        <p><strong>Fecha de entrega:</strong> {new Date(fechaFin).toLocaleDateString()}</p>
        <p><strong>Estado:</strong> {estado}</p>
      </div>
    </div>
  )
}

export default BookinCard
