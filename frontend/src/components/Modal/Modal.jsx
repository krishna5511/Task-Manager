import "./Modal.css";

import { FaTimes } from "react-icons/fa";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
}) => {

  if (!isOpen) return null;

  return (

    <div className="modalOverlay">

      <div className="modal">

        <div className="modalHeader">

          <h2>{title}</h2>

          <button
            className="closeBtn"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>

        <div className="modalBody">

          {children}

        </div>

      </div>

    </div>

  );

};

export default Modal;