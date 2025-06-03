// components/common/ConfirmDialog.jsx
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '../ui/buttons/Button';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Dialog as="div" className="relative z-50 " open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded bg-white p-6 shadow-lg confirmDialog">
          <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            {message}
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
             <button
              onClick={onConfirm}
              className="px-4 text-sm rounded addingBtn bg-[#055393] hover:bg-[#04457a]  "
              style={{paddingBlock : '0'}}
            >
              تأكيد
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200 cancelBtn"
            >
                إلغاء   
            </button>
           
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
