import React, { useEffect, useRef } from "react";

import { FaXmark } from "react-icons/fa6";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  styleName?: string;
};

export default function Modal({ isOpen, title, onClose, children, styleName }: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", onKey);
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Dialog"}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative z-10 w-full max-w-2xl mx-4 rounded-lg bg-black shadow-lg max-h-[80vh] overflow-hidden ${ styleName }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            ref={closeBtnRef}
            aria-label="Close dialog"
            onClick={onClose}
            className="ml-4 p-2 rounded hover:bg-gray-100"
          >
            <FaXmark />
          </button>
        </div>

        <div className="p-4 userform overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}