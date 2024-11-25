import React from 'react';
import './policiesPage.css';

const PoliciesPage = () => {
  return (
    <div className="policies-page-container">
      <h1 className="heading">Políticas de Uso - Royal Ride</h1>
      <div className="policy-content">
        <h2 className="subheading">1. Introducción</h2>
        <p className="paragraph">
          Bienvenido a Royal Ride. Al utilizar nuestra plataforma de alquiler de vehículos de lujo, aceptas cumplir con los siguientes
          términos y condiciones, los cuales describen el uso de nuestros servicios. Si no estás de acuerdo con alguna de estas políticas,
          por favor, no utilices nuestros servicios.
        </p>

        <h2 className="subheading">2. Uso de la Plataforma</h2>
        <p className="paragraph">
          Royal Ride te ofrece acceso a su plataforma digital para alquilar vehículos de lujo. El uso de nuestra plataforma está
          condicionado a la aceptación de estos términos y al cumplimiento de todas las leyes y regulaciones aplicables.
        </p>

        <h2 className="subheading">3. Responsabilidad del Usuario</h2>
        <p className="paragraph">
          Al utilizar los servicios de Royal Ride, el usuario se compromete a:
        </p>
        <ul className="list">
          <li>Proporcionar información veraz y completa al momento del registro.</li>
          <li>Usar los vehículos alquilados de acuerdo con las normas de tráfico y de manera responsable.</li>
          <li>No subarrendar, ceder o transferir los vehículos a terceros sin el consentimiento previo de Royal Ride.</li>
        </ul>

        <h2 className="subheading">4. Proceso de Reserva</h2>
        <p className="paragraph">
          Las reservas de vehículos se pueden realizar a través de nuestra plataforma web o aplicación móvil. El usuario debe proporcionar
          la información necesaria para completar la reserva, incluyendo datos personales, información de pago y fechas de alquiler.
        </p>

        <h2 className="subheading">5. Precios y Pagos</h2>
        <p className="paragraph">
          Los precios de alquiler están sujetos a cambios y pueden variar según la disponibilidad, la duración del alquiler, y los servicios
          adicionales solicitados. El pago se realiza de manera anticipada y se puede efectuar a través de métodos de pago habilitados en la
          plataforma.
        </p>

        <h2 className="subheading">6. Política de Cancelación</h2>
        <p className="paragraph">
          Las reservas pueden ser canceladas según los términos establecidos en la plataforma. Las cancelaciones fuera del plazo establecido
          pueden implicar cargos adicionales o la pérdida del monto abonado.
        </p>

        <h2 className="subheading">7. Privacidad y Seguridad</h2>
        <p className="paragraph">
          En Royal Ride, nos comprometemos a proteger la privacidad y la seguridad de la información personal de nuestros usuarios. Para más
          detalles, revisa nuestra Política de Privacidad.
        </p>

        <h2 className="subheading">8. Modificaciones a las Políticas</h2>
        <p className="paragraph">
          Royal Ride se reserva el derecho de modificar estas políticas en cualquier momento. Cualquier cambio será comunicado a los usuarios
          a través de nuestra plataforma.
        </p>

        <h2 className="subheading">9. Contacto</h2>
        <p className="paragraph">
          Si tienes preguntas o inquietudes sobre nuestras políticas, puedes contactarnos a través de los siguientes canales:
        </p>
        <ul className="list">
          <li>Correo electrónico: support@royalride.com</li>
          <li>Teléfono: +xxxxxx</li>
        </ul>
      </div>
    </div>
  );
};

export default PoliciesPage;
