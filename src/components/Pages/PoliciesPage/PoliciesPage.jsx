import React from 'react';
import './policiesPage.css';

const policies = [
  {
    title: "Uso de la Plataforma",
    description:
      "Royal Ride ofrece acceso a su plataforma digital para alquilar vehículos de lujo. El uso está condicionado a la aceptación de estos términos y al cumplimiento de las leyes aplicables.",
  },
  {
    title: "Responsabilidad del Usuario",
    description:
      "El usuario se compromete a proporcionar información veraz, usar los vehículos de forma responsable, y no transferirlos a terceros sin consentimiento previo.",
  },
  {
    title: "Proceso de Reserva",
    description:
      "Las reservas se realizan a través de nuestra plataforma web o aplicación móvil, proporcionando datos necesarios como información personal, de pago y fechas de alquiler.",
  },
  {
    title: "Precios y Pagos",
    description:
      "Los precios pueden variar según la disponibilidad y duración del alquiler. El pago se realiza de manera anticipada a través de métodos habilitados en la plataforma.",
  },
  {
    title: "Política de Cancelación",
    description:
      "Las cancelaciones deben realizarse dentro del plazo establecido en nuestra plataforma. Cancelaciones tardías pueden implicar cargos adicionales.",
  },
  {
    title: "Privacidad y Seguridad",
    description:
      "Nos comprometemos a proteger la privacidad de nuestros usuarios. Para más detalles, revisa nuestra Política de Privacidad.",
  },
  {
    title: "Modificaciones a las Políticas",
    description:
      "Royal Ride se reserva el derecho de modificar estas políticas. Cualquier cambio será comunicado a través de nuestra plataforma.",
  },
];

const PoliciesPage = () => {
  return (
    <div className="policies-page-container">
      <h1 className="heading underline">Políticas de Uso - Royal Ride</h1>
      <h2 className="intro">
        Bienvenido a Royal Ride. Al utilizar nuestra plataforma de alquiler de vehículos de lujo, aceptas cumplir con los términos y condiciones descritos aquí. Si no estás de acuerdo con estas políticas, por favor, no utilices nuestros servicios.
      </h2>
      <div className="policy-columns">
        {policies.map((policy, index) => (
          <div key={index} className="policy-card">
            <h3 className="policy-title">{policy.title}</h3>
            <p className="policy-description">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesPage;
