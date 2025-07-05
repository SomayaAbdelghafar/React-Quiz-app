import React, { ReactNode, useEffect, useRef } from 'react';

interface SharedModalProps {
  show?: boolean;
  title?: string;
  body: ReactNode;
  onClose: () => void;
  onSave?: () => void;
  omitHeader?: boolean;
}
const SharedModal: React.FC<SharedModalProps> = ({
  show,
  title,
  body,
  onClose,
  onSave,
  omitHeader,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    };
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50  ${
        show ? 'flex justify-center items-center' : 'hidden'
      }`}
    >
      <div
        ref={modalRef}
        className='bg-white min-w-[40%] max-w-[90%] h-auto rounded-lg'
      >
        <div
          className={`header flex justify-between border-b-2 ${
            omitHeader ? 'hidden' : 'inline'
          }`}
        >
          <div className='headerName mt-3 ml-2 text-xl font-semibold'>{title}</div>
          <div className='Icons-close-save'>
            <button
              className={`border-l-2 p-3`}
              form='quizModal'
              type='submit'
              onClick={onSave}
            >
              <i className='fa-solid fa-check'></i>
            </button>
            <button
              className='border-l-2 p-3 text-red-500'
              aria-label='Close'
              onClick={onClose}
            >
              <i className='fa-solid fa-xmark'></i>
            </button>
          </div>
        </div>
        <div className='py-4'>{body}</div>
      </div>
    </div>
  );
};

export default SharedModal;
