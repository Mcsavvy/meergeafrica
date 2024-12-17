"use client";
import React, { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

type ModalProps = {
  id?: string;
  layer?: "primary" | "secondary";
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
  className?: string;
};

type ModalHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

type ModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

type ModalComponent = React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
};

type ModalHandlers = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

// Global modal state manager
const modalRegistry = new Map<string, ModalHandlers>();
const registerModal = (id: string, handlers: ModalHandlers) => {
  modalRegistry.set(id, handlers);
};

const unregisterModal = (id: string) => {
  modalRegistry.delete(id);
};

// Global click handler
const documentClickHandler = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null;
  const trigger = target?.closest("[data-modal-trigger]");
  const toggle = target?.closest("[data-modal-toggle]");
  const hide = target?.closest("[data-modal-hide]");

  if (trigger) {
    const modalId = trigger.getAttribute("data-modal-trigger");
    if (
      !modalId ||
      !modalRegistry.has(modalId) ||
      modalRegistry.get(modalId) === undefined
    ) {
      console.error(`Modal with id ${modalId} not found`);
    } else {
      e.preventDefault();
      const handlers = modalRegistry.get(modalId);
      console.log(`Opening modal ${modalId}`);
      handlers?.open();
    }
  }

  if (toggle) {
    const modalId = toggle.getAttribute("data-modal-toggle");
    if (
      !modalId ||
      !modalRegistry.has(modalId) ||
      modalRegistry.get(modalId) === undefined
    ) {
      console.error(`Modal with id ${modalId} not found`);
    } else {
      e.preventDefault();
      const handlers = modalRegistry.get(modalId);
      console.log(`Toggling modal ${modalId}`);
      handlers?.toggle();
    }
  }

  if (hide) {
    let modalId = hide.getAttribute("data-modal-hide");
    if ([null, undefined, "true"].includes(modalId)) {
      const modal = hide.closest("[role=dialog]");
      modalId = modal?.id || null;
    }
    if (
      !modalId ||
      !modalRegistry.has(modalId) ||
      modalRegistry.get(modalId) === undefined
    ) {
      console.error(`Modal with id ${modalId} not found`);
      console.log(typeof modalId);
    } else {
      e.preventDefault();
      const handlers = modalRegistry.get(modalId);
      console.log(`Closing modal ${modalId}`);
      handlers?.close();
    }
  }
};

const Modal: ModalComponent = ({
  id,
  layer = "primary",
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onOpen: externalOnOpen,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    externalOnClose?.();
  }, [externalOnClose]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    externalOnOpen?.();
  }, [externalOnOpen]);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    }
    handleOpen();
  }, [isOpen, handleClose, handleOpen]);

  useEffect(() => {
    if (id) {
      registerModal(id, {
        open: handleOpen,
        close: handleClose,
        toggle: handleToggle,
      });

      return () => unregisterModal(id);
    }
  }, [id, handleOpen, handleClose, handleToggle]);

  // Sync with external state if provided
  useEffect(() => {
    if (externalIsOpen === true) {
      handleOpen();
    } else if (externalIsOpen === false) {
      handleClose();
    }
  }, [externalIsOpen, handleOpen, handleClose]);

  useEffect(() => {
    console.log(`Modal ${id} is ${isOpen ? "open" : "closed"}`);
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timeout);
    }
  }, [isOpen, id]);

  if (!isOpen && !isAnimating) return null as React.ReactNode;

  return (
    <div
      role="dialog"
      id={id}
      className={`
        fixed inset-0 flex items-center justify-center
        ${isOpen ? "animate-fade-in" : "animate-fade-out"}
        ${layer === "primary" ? "z-50" : "z-[60]"}
        bg-black bg-opacity-50 transition-opacity duration-300
      `}
      onClick={handleClose}
      style={{
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div
        className={`
          relative flex flex-col w-full max-w-2xl max-h-[calc(100vh-2rem)] m-4
          bg-white dark:bg-gray-700 rounded-lg shadow-xl
          ${isOpen ? "animate-slide-up" : "animate-slide-down"}
          transition-transform duration-300
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children, className = "" }) => (
  <div
    className={`
    flex items-center justify-between p-4 md:p-5
    border-b dark:border-gray-600 rounded-t
    ${className}
  `}
  >
    <div className="text-xl font-semibold text-gray-900 dark:text-white">
      {children}
    </div>
    <button
      data-modal-hide
      type="button"
      className="text-gray-700 bg-gray-300 hover:bg-gray-200 
        hover:text-gray-900 rounded-full text-sm w-8 h-8 
        inline-flex justify-center items-center
        dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <X className="w-4 h-4" />
      <span className="sr-only">Close modal</span>
    </button>
  </div>
);

Modal.Header.displayName = "Modal.Header";

Modal.Body = ({ children, className = "" }) => (
  <div className={`flex-1 p-4 md:p-5 space-y-4 overflow-y-auto ${className}`}>
    {children}
  </div>
);

Modal.Body.displayName = "Modal.Body";

Modal.Footer = ({ children, className = "" }) => (
  <div
    className={`
    flex items-center justify-end p-4 md:p-5 
    border-t border-gray-200 dark:border-gray-600 rounded-b
    space-x-3
    ${className}
  `}
  >
    {children}
  </div>
);

Modal.Footer.displayName = "Modal.Footer";

let isModalSetupRendered = false;

export const ModalSetup = () => {
  useEffect(() => {
    if (!isModalSetupRendered) {
      document.addEventListener("click", documentClickHandler);
      isModalSetupRendered = true;
    }
    return () => {
      if (isModalSetupRendered) {
        document.removeEventListener("click", documentClickHandler);
        isModalSetupRendered = false;
      }
    };
  }, []);
  return null as React.ReactNode;
};

export const useModal = (id: string) => {
  const open = useCallback(() => {
    const handlers = modalRegistry.get(id);
    handlers?.open();
  }, [id]);

  const close = useCallback(() => {
    const handlers = modalRegistry.get(id);
    handlers?.close();
  }, [id]);

  const toggle = useCallback(() => {
    const handlers = modalRegistry.get(id);
    handlers?.toggle();
  }, [id]);

  return { open, close, toggle };
};

export default Modal;
