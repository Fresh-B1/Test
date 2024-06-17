import React from 'react';
import './modalWindow.css';

interface ModalProps {
  action: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalWindow: React.FC<ModalProps> = ({ action, onConfirm, onCancel }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <p>Вы уверены, что хотите изменить статус на "{action}"?</p>
        <div className='modal-buttons'>
          <button onClick={onConfirm}>Подтвердить</button>
          <button onClick={onCancel}>Отменить</button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
