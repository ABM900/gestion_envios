import React from 'react';
import styles from './Modal.module.css'; // o usa styled-components si prefieres

export function Modal({
    isOpen,
    onClose,
    children
}: {
    isOpen: boolean,
    onClose(): void,
    children: React.ReactNode
}) {
    if (!isOpen) return null; // Si no está abierto, no renderiza nada.

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};