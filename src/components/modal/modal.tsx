import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  openModal: boolean;
  handleClose: any;
  children: React.ReactNode;
  classname?: string;
}

export function Modal({ handleClose, openModal, children, ...rest }: ModalProps) {
  return (
    <Transition.Root show={openModal} as={Fragment} {...rest}>
      <Dialog
        as="div"
        className={`fixed z-100 inset-0 overflow-y-auto`}
        onClose={handleClose}
      >
        <div className="flex items-center mb-44 justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-[3px] bg-primary-black/[10%]  backdrop-saturate-150 backdrop-brightness-100" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
