import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  const lang = typeof window !== 'undefined' ? localStorage.getItem('lang') : 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-[9999]">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                dir={dir}
                className="w-full max-w-md transform overflow-visible rounded-2xl bg-white p-6 text-start align-middle shadow-xl transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="space-y-4">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
