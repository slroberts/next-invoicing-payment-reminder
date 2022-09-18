import { Fragment, useRef, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export type ModalProps = {
  open: boolean;
  setOpen: any;
  modalTitle: string;
  children: ReactNode;
};

export default function Modal({
  open,
  setOpen,
  modalTitle,
  children,
}: ModalProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto flex justify-center items-center min-h-screen'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <Dialog.Panel className=' bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full sm:max-w-xl mx-6 px-4 pb-8'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='mt-3'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg leading-6 font-medium text-gray-400'
                  >
                    {modalTitle}
                  </Dialog.Title>
                  <div className='mt-4'>{children}</div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
