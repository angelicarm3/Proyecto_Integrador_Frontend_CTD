import React from "react";
import './registrationConfirmModal.css'
import isoWhite from '../../../assets/brand/isoWhite.svg'

function RegistrationConfirmModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="registration-modal-overlay" onClick={onClose}>
            <div
                className="registration-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className=" secondary-btn registration-modal-close " onClick={onClose}>
                    ✖
                </button>
                <div className="registration-modal-content-info">
                    <img src={isoWhite} alt="isoWhite" />
                    <p>
                        Tu inscripción se ha realizado con éxito.<br />
                        En breve te enviaremos un
                        <br />
                        correo de confirmación.
                    </p>
                </div>
                <div className="registration-modal-content-button">
                    <span>¿No has recibido ningún correo?</span>
                    <button className="secondary-btn">Reenviar</button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default RegistrationConfirmModal;
