import React from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

import styles from './popupWrap.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopupWrap = ({ isOpen, onClose, children } : ModalProps) => {
  const modalRoot = document.getElementById('modal-root');

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          <X fill='black' stroke='black'/>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default PopupWrap;

