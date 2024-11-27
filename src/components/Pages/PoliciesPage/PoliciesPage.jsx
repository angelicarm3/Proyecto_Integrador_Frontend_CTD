import { useEffect } from 'react'

import './PoliciesPage.css'
import isoGold from '../../../assets/brand/isoGold.png'

const policies = [
  {
    title: '1. Elegibilidad del Cliente',
    description:
      'Los clientes deben ser mayores de 25 años para alquilar vehículos de lujo. Es obligatorio presentar una licencia de conducir válida, emitida al menos un año antes de la fecha de alquiler. Se requiere una tarjeta de crédito válida para el depósito de garantía.'
  },
  {
    title: '2. Reservaciones y Cancelaciones',
    description:
      'Las reservaciones deben realizarse con al menos 48 horas de anticipación. Cancelaciones realizadas con menos de 24 horas de aviso están sujetas a una penalización equivalente al 50% del costo del alquiler. La empresa se reserva el derecho de confirmar la disponibilidad de los vehículos al momento de la reserva.'
  },
  {
    title: '3. Depósito de Garantía',
    description:
      'Un depósito de garantía es obligatorio para cubrir posibles daños o incumplimientos de contrato. El monto del depósito dependerá del vehículo seleccionado y se reembolsará íntegramente si el auto es devuelto en las mismas condiciones.'
  },
  {
    title: '4. Condiciones de Uso',
    description:
      'Los autos están estrictamente prohibidos para competencias, conducción fuera de carretera o cualquier actividad que pueda comprometer la integridad del vehículo. No se permite fumar dentro de los vehículos. Se aplicará una tarifa de limpieza en caso de incumplimiento. Los vehículos solo pueden conducirse dentro de las áreas geográficas permitidas especificadas en el contrato.'
  },
  {
    title: '5. Política de Combustible',
    description:
      'Los autos se entregan con el tanque lleno y deben devolverse de la misma manera. En caso de no cumplir esta política, se cobrará una tarifa adicional por el combustible faltante.'
  },
  {
    title: '6. Seguro y Responsabilidad.',
    description:
      'Todos los vehículos cuentan con seguro básico incluido. Opcionalmente, el cliente puede adquirir coberturas adicionales. El cliente es responsable de cualquier daño no cubierto por el seguro o violaciones a las leyes de tránsito.'
  },
  {
    title: '7. Mantenimiento y Emergencias',
    description:
      'La empresa garantiza que los vehículos estarán en condiciones óptimas al momento del alquiler. En caso de emergencia mecánica, el cliente debe contactar al servicio de asistencia de la empresa inmediatamente.'
  },
  {
    title: '8. Política de Extensión de Alquiler',
    description:
      'Las extensiones deben solicitarse con al menos 24 horas de anticipación y están sujetas a la disponibilidad del vehículo. El pago por la extensión debe realizarse antes del vencimiento del período de alquiler original.'
  },
  {
    title: '9. Confidencialidad y Protección de Datos',
    description:
      'La información del cliente será manejada de manera confidencial y únicamente para fines relacionados con el alquiler. La empresa cumple con las normativas legales vigentes en protección de datos.'
  },
  {
    title: '10. Sanciones por Incumplimiento',
    description:
      'En caso de incumplimiento de cualquiera de estas políticas, la empresa se reserva el derecho de retener parte o la totalidad del depósito de garantía. Los clientes que reincidan en violaciones a estas políticas podrán ser excluidos de futuros alquileres.'
  }
]

const PoliciesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='main-page mt-[68px]'>
      <div className='main-section flex flex-col text-white gap-4'>
        <div className='w-full flex justify-center items-center gap-3'>
          <img src={isoGold} alt='Logo de la marca' className='h-[90px]' />
          <h1 className='title w-fit underline mt-3'>Políticas de Uso</h1>
        </div>
        <div className='policy-columns'>
          {policies.map((policy, index) => (
            <div key={index} className='policy-card'>
              <h3 className='policy-title'>{policy.title}</h3>
              <p className='policy-description'>{policy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PoliciesPage
