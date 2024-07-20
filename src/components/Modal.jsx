import React, { useEffect, useRef } from 'react';
import './Modal.css'; // Ensure to import the CSS file

const Modal = ({ show, onClose, onConfirm, title, taskState }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal text-center" ref={modalRef}>
        <h2>{title}</h2>
        {!taskState && (
          <button
            className='bg-black hover:bg-gray-700 text-white py-1 px-4 mt-2 rounded'
            onClick={() => onConfirm(true)}
          >
            Completed
          </button>
        )}
        {taskState && (
          <button
            className='bg-black hover:bg-gray-700 text-white py-1 px-4 mt-2 rounded'
            onClick={() => onConfirm(false)}
          >
            Not Completed
          </button>
        )}
        {/* <button className='bg-black hover:bg-gray-700 text-white py-1 px-4 mx-2 rounded' onClick={() => onConfirm(false)}>No</button> */}
      </div>
    </div>
  );
};

export default Modal;
