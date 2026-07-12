import { useEffect } from 'react';
import { XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

const ModalBackdrop = ({
  children,
  onCloseBackdrop,
}: {
  children: React.ReactNode;
  onCloseBackdrop: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-xs transition-all animate-in"
      onClick={onCloseBackdrop}
    >
      {children}
    </div>
  );
};

export const Modal = ({
  children,
  title,
  onClosed,
}: {
  children: React.ReactNode;
  title: string;
  onClosed: () => void;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClosed();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClosed]);

  return createPortal(
    <ModalBackdrop onCloseBackdrop={onClosed}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-3/4 md:w-1/2 bg-white rounded-md p-4 shadow-2xl"
      >
        <header className="flex justify-between pb-2">
          <h2 className="text-xl">{title}</h2>
          <button
            className="text-gray-400 hover:text-gray-600 hover:bg-white rounded-full p-1 transition-colors cursor-pointer"
            onClick={onClosed}
          >
            <XIcon />
          </button>
        </header>

        {children}
      </div>
    </ModalBackdrop>,
    document.body
  );
};
