import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";

import "./modal.scss";

const Modal = ({ open, onClose, children, ref }) => {
  // if (!open) return null; // CSSTransition will take care of opening and closing in animation

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <article
      className="modal__overlay"
      role="dialog"
      aria-modal="true"
      ref={ref}
    >
      <div className="modal__content">
        {children}
        <IoClose
          className="modal__content__close-btn"
          onClick={onClose}
          aria-label="Close modal"
        />
      </div>
    </article>,
    document.getElementById("modal-root")
  );
};

export default Modal;
