"use client";

import React, { ReactNode, useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!mounted) return;

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, open, mounted]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  if (!mounted) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto ">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={handleBackdropClick}
          />

          {/* Modal container */}
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-[90vw] md:w-1/2 h-auto transform overflow-hidden rounded-2xl bg-[#141414] text-left align-middle shadow-xl border border-none"
              role="dialog"
              aria-modal="true"
            >
              <div className="">
                {onClose && (
                  <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 z-30 text-gray-400 hover:text-white rounded-full bg-gray-800 text-5xl"
                    aria-label="Close"
                  >
                    <X />
                  </button>
                )}
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

export default Modal;
