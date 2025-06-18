// components/common/ConfirmDialog.jsx
import { Dialog } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  const [direction, setDirection] = useState('ltr');
      const { t } = useTranslation();
  

  useEffect(() => {
    const dir = document.documentElement.dir || 'ltr';
    setDirection(dir);
  }, []);

  const isRTL = direction === 'rtl';

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose} dir={direction}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded bg-white p-6 shadow-lg confirmDialog">
          <Dialog.Title className={`text-lg font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
            {title}
          </Dialog.Title>

          <Dialog.Description className={`mt-2 text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
            {message}
          </Dialog.Description>

          <div className={`mt-6 flex gap-3 ${isRTL ? 'justify-end' : 'justify-end'}`}>
            <button
              onClick={onConfirm}
              className="px-4 text-sm rounded addingBtn bg-[#055393] hover:bg-[#04457a]"
              style={{ paddingBlock: '0' }}
            >
              {t('confirm')}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200 cancelBtn"
            >
              {t('cancel')}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
